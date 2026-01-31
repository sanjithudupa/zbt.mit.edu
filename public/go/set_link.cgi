#!/usr/bin/env python3
import json, os, sys

WEB_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REDIRECTS = os.path.join(WEB_ROOT, "redirects.json")
TMP = REDIRECTS + ".tmp"

def respond(code, body):
    print(f"Status: {code}")
    print("Content-Type: text/plain; charset=utf-8")
    print("Cache-Control: no-store")
    print()
    sys.stdout.write(body)

try:
    n = int(os.environ.get("CONTENT_LENGTH") or "0")
    raw = sys.stdin.read(n) if n > 0 else ""
    req = json.loads(raw) if raw else {}
except Exception:
    respond("400 Bad Request", "bad request\n")
    raise SystemExit(0)

action = req.get("action")
shortcut = (req.get("shortcut") or "").strip()
url = (req.get("url") or "").strip()

if not shortcut or "/" in shortcut or " " in shortcut:
    respond("400 Bad Request", "invalid shortcut\n")
    raise SystemExit(0)

data = {}
if os.path.exists(REDIRECTS):
    try:
        with open(REDIRECTS) as f:
            data = json.load(f)
    except Exception:
        data = {}

old = data.get(shortcut)

if action == "update":
    if not (url.startswith("http://") or url.startswith("https://")):
        respond("400 Bad Request", "url must start with http:// or https://\n")
        raise SystemExit(0)
    data[shortcut] = url
    with open(TMP, "w") as f:
        json.dump(data, f, indent=2, sort_keys=True)
        f.write("\n")
    os.replace(TMP, REDIRECTS)
    respond("200 OK", f"updated shortcut for {shortcut} from {old} to {url}\n")

elif action == "remove":
    data.pop(shortcut, None)
    with open(TMP, "w") as f:
        json.dump(data, f, indent=2, sort_keys=True)
        f.write("\n")
    os.replace(TMP, REDIRECTS)
    respond("200 OK", f"removed shortcut for {shortcut}, previous was {old}\n")

else:
    respond("400 Bad Request", "action must be update or remove\n")

