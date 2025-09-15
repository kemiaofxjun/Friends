import requests
from tenacity import retry, stop_after_attempt, wait_fixed

@retry(stop=stop_after_attempt(2), wait=wait_fixed(2))
def is_alive(url):
    try:
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/117 Safari/537.36"
            )
        }
        response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
        if response.status_code >= 400:
            return False
        if "404" in response.text.lower() or "not found" in response.text.lower():
            return False
        return True
    except Exception:
        return False
