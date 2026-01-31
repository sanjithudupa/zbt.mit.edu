#!/usr/bin/env python3
import json, sys, os

PATH = "public/redirects.json"

if len(sys.argv) < 3:
    print('usage: go update <shortcut> <url> | go remove <shortcut>')
    sys.exit(1)

cmd = sys.argv[1]
key = sys.argv[2]

data = {}
if os.path.exists(PATH):
    with open(PATH) as f:
        try:
            data = json.load(f)
        except:
            data = {}

if cmd == "update":
    if len(sys.argv) < 4:
        print('usage: go update <shortcut> <url>')
        sys.exit(1)
    new = sys.argv[3]
    old = data.get(key)
    data[key] = new
    with open(PATH, "w") as f:
        json.dump(data, f, indent=2, sort_keys=True)
    print(f"updated shortcut for {key} from {old} to {new}")

elif cmd == "remove":
    old = data.pop(key, None)
    with open(PATH, "w") as f:
        json.dump(data, f, indent=2, sort_keys=True)
    print(f"removed shortcut for {key}, previous was {old}")

else:
    print('usage: go update <shortcut> <url> | go remove <shortcut>')
    sys.exit(1)

