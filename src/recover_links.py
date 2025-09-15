import json
import requests

def is_alive(url):
    try:
        response = requests.head(url, timeout=10, allow_redirects=True)
        return response.status_code < 400
    except Exception:
        return False

with open("src/links.json", "r", encoding="utf-8") as f:
    links = json.load(f)

with open("src/link-dead.json", "r", encoding="utf-8") as f:
    dead_links = json.load(f)

still_dead = []
recovered = []

for item in dead_links:
    if is_alive(item["link"]):
        recovered.append(item)
    else:
        still_dead.append(item)

# 把恢复的链接加到 links.json 最底部
links.extend(recovered)

with open("src/links.json", "w", encoding="utf-8") as f:
    json.dump(links, f, ensure_ascii=False, indent=2)

# 更新死链文件
with open("src/link-dead.json", "w", encoding="utf-8") as f:
    json.dump(still_dead, f, ensure_ascii=False, indent=2)
