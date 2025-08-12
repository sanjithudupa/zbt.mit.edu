import re
import json
import pandas as pd
from collections import defaultdict

# gpt generated code

PATH = "ZBT Lineage Data.xlsx"

# ---------- Utilities ----------
def parse_sheet_title(title: str):
    m = re.match(r'^\s*(.+?)\s*\(\s*(\d{4})\s*\)\s*$', str(title))
    if not m:
        return str(title).strip(), None
    return m.group(1).strip(), int(m.group(2))

def split_names(cell: str):
    if not isinstance(cell, str):
        return []
    parts = re.split(r',|;|/|&|\band\b|\n', cell, flags=re.IGNORECASE)
    return [p.strip() for p in parts if p and p.strip()]

def normalize_name(name: str):
    return re.sub(r'\s+', ' ', name.strip()) if isinstance(name, str) else None

def read_sheet(xls, sheet_name):
    df = pd.read_excel(xls, sheet_name=sheet_name, dtype=str).fillna("")
    df.columns = [str(c).strip() for c in df.columns]
    cols = {c.lower(): c for c in df.columns}
    name_col   = cols.get('name')
    big_col    = cols.get('big') or cols.get('big(s)')
    little_col = cols.get('little(s)') or cols.get('littles') or cols.get('little')
    return df, name_col, big_col, little_col

# ---------- Pass 1: attributes from Name column only ----------
def collect_person_attributes(xls):
    """
    Only use Name column to assign a person's own (class_name, class_year, rush_year).
    This avoids mislabeling Big/Little entries with the wrong year.
    """
    attrs = {}
    for sheet in xls.sheet_names:
        class_name, year = parse_sheet_title(sheet)
        df, name_col, _, _ = read_sheet(xls, sheet)
        if not name_col:
            continue
        for n in df[name_col].tolist():
            nn = normalize_name(n)
            if not nn:
                continue
            # First seen wins; switch to latest/earliest by comparing year if desired
            if nn not in attrs:
                attrs[nn] = {
                    "class_name": class_name,
                    "class_year": year,
                    "rush_year": year
                }
    return attrs

# ---------- Pass 2: single-parent lineage across ALL sheets ----------
def build_global_lineage(xls):
    """
    Build a global parent map (child -> parent) across all sheets.
    Prefer Big->Name (authoritative). Use Name->Little(s) to fill missing parents.
    """
    parent = {}                 # child -> parent
    nodes = set()

    # First collect all names seen anywhere to stabilize node set
    for sheet in xls.sheet_names:
        df, name_col, big_col, little_col = read_sheet(xls, sheet)
        if name_col:
            for n in df[name_col].tolist():
                nn = normalize_name(n)
                if nn:
                    nodes.add(nn)
        if big_col:
            for b in df[big_col].tolist():
                nb = normalize_name(b)
                if nb:
                    nodes.add(nb)
        if little_col:
            for cell in df[little_col].tolist():
                for lit in split_names(cell):
                    nl = normalize_name(lit)
                    if nl:
                        nodes.add(nl)

    # Pass A: authoritative Big -> Name
    for sheet in xls.sheet_names:
        df, name_col, big_col, _ = read_sheet(xls, sheet)
        if not (name_col and big_col):
            continue
        for _, row in df.iterrows():
            child = normalize_name(row.get(name_col))
            big   = normalize_name(row.get(big_col))
            if child:
                nodes.add(child)
            if big:
                nodes.add(big)
            if child and big and child not in parent:
                parent[child] = big

    # Pass B: fill gaps via Name -> Littles
    for sheet in xls.sheet_names:
        df, name_col, _, little_col = read_sheet(xls, sheet)
        if not (name_col and little_col):
            continue
        for _, row in df.iterrows():
            name = normalize_name(row.get(name_col))
            if not name:
                continue
            littles = split_names(row.get(little_col))
            for lit in littles:
                nl = normalize_name(lit)
                if not nl:
                    continue
                if nl not in parent:
                    parent[nl] = name

    return nodes, parent

# ---------- Build trees ----------
def build_children_map(nodes, parent):
    children = defaultdict(list)
    for n in nodes:
        children.setdefault(n, [])
    for child, par in parent.items():
        children[par].append(child)
    return children

def node_with_attributes(name, children_map, person_attrs, seen=None):
    if seen is None:
        seen = set()
    if name in seen:   # defensive against accidental cycles
        return {"name": name, "attributes": person_attrs.get(name, {}), "children": []}
    seen = seen | {name}

    # sort children by (class_year asc, name) to “continue in that direction”
    def sort_key(x):
        cy = person_attrs.get(x, {}).get("class_year")
        return (9999 if cy is None else cy, x)

    return {
        "name": name,
        "attributes": person_attrs.get(name, {}),
        "children": [
            node_with_attributes(c, children_map, person_attrs, seen)
            for c in sorted(set(children_map[name]), key=sort_key)
        ]
    }

def workbook_to_dependency_tree(path: str):
    xls = pd.ExcelFile(path)

    # 1) Global per-person attributes (Name columns only)
    person_attrs = collect_person_attributes(xls)

    # 2) Global lineage (single parent per person)
    nodes, parent = build_global_lineage(xls)
    children_map = build_children_map(nodes, parent)

    # 3) Determine earliest class year present
    years = [v.get("class_year") for v in person_attrs.values() if v.get("class_year") is not None]
    earliest_year = min(years) if years else None

    # Roots = nodes without a parent. Promote earliest-year roots first.
    roots = [n for n in nodes if n not in parent]
    def root_sort_key(x):
        cy = person_attrs.get(x, {}).get("class_year")
        return (9999 if cy is None else cy, x)
    roots_sorted = sorted(roots, key=root_sort_key)

    # 4) Synthetic root with "root" attributes; attach all roots,
    # with earliest-year nodes appearing first (and thus “parent of the earliest year”).
    forest = [node_with_attributes(r, children_map, person_attrs) for r in roots_sorted]

    tree = {
        "name": "root",
        "attributes": {
            "class_name": "root",
            "class_year": "root",
            "rush_year": "root",
            "earliest_year_in_data": earliest_year
        },
        "children": forest
    }
    return tree

# ---------- Run ----------
if __name__ == "__main__":
    tree = workbook_to_dependency_tree(PATH)
    print(json.dumps(tree, ensure_ascii=False, indent=2))
    with open('../src/data/geneology.json', 'w') as f:
        json.dump(tree, f, indent=2)
    
