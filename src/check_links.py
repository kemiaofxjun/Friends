import json
from smart_checker import is_alive

with open("src/links.json", "r", encoding="utf-8") as f:
    links = json.load(f)

alive_links = []
dead_links = []

for item in links:
    if is_alive(item["link"]):
        alive_links.append(item)
    else:
        dead_links.append(item)

with open("src/links.json", "w", encoding="utf-8") as f:
    json.dump(alive_links, f, ensure_ascii=False, indent=2)

with open("src/link-dead.json", "w", encoding="utf-8") as f:
    json.dump(dead_links, f, ensure_ascii=False, indent=2)
