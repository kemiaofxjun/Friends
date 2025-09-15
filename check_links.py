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

dead_links = []
alive_links = []

for item in links:
    if is_alive(item["link"]):
        alive_links.append(item)
    else:
        dead_links.append(item)

# 保存死链
with open("src/link-dead.json", "w", encoding="utf-8") as f:
    json.dump(dead_links, f, ensure_ascii=False, indent=2)

# 保留活链（不动）
with open("src/links.json", "w", encoding="utf-8") as f:
    json.dump(alive_links, f, ensure_ascii=False, indent=2)
