import requests
import json

try:
    print("Checking port 8001...")
    r = requests.get('http://localhost:8001/api/items')
    if r.status_code == 200:
        items = r.json()
        for item in items:
            if "Acne" in item.get('title', ''):
                print(f"Port 8001 Item: {item['title']}")
                print(f"Port 8001 Image: {item['image']}")
    else:
        print(f"Port 8001 returned {r.status_code}")

except Exception as e:
    print(f"Port 8001 failed: {e}")

try:
    print("\nChecking port 8000...")
    r = requests.get('http://localhost:8000/api/items')
    if r.status_code == 200:
        items = r.json()
        for item in items:
            if "Acne" in item.get('title', ''):
                print(f"Port 8000 Item: {item['title']}")
                print(f"Port 8000 Image: {item['image']}")
    else:
        print(f"Port 8000 returned {r.status_code}")
except Exception as e:
    print(f"Port 8000 failed: {e}")
