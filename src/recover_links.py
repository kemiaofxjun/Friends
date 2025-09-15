import json
from smart_checker import is_alive

with open("src/links.json", "r", encoding="utf-8") as f:
    links = json.load(f)

with open("src/link-dead.json", "r", encoding="utf-8") as f:
    dead_links = json.load(f)

recovered = []
still_dead = []

for item in dead_links:
    if is_alive(item["link"]):
        recovered.append(item)
    else:
        still_dead.append(item)

links.extend(recovered)

with open("src/links.json", "w", encoding="utf-8") as f:
    json.dump(links, f, ensure_ascii=False, indent=2)

with open("src/link-dead.json", "w", encoding="utf-8") as f:
    json.dump(still_dead, f, ensure_ascii=False, indent=2)
