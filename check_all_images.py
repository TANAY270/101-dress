import requests
import json

try:
    print("Fetching items from port 8001...")
    r = requests.get('http://localhost:8001/api/items')
    if r.status_code == 200:
        items = r.json()
        for item in items:
            print(f"Title: {item['title']}")
            print(f"Image: {item['image']}")
            print("-" * 20)
    else:
        print(f"Port 8001 returned {r.status_code}")

except Exception as e:
    print(f"Failed to fetch items: {e}")
