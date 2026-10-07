files = [
    "/etc/nginx/sites-available/learn.kaidevlab.com",
    "/etc/nginx/sites-available/study.kaidevlab.com",
]

block = """    location /api/ {
        proxy_pass http://127.0.0.1:4100;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

"""

for path in files:
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        if "location /api/" not in content:
            content = content.replace("    location / {", block + "    location / {")
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Successfully patched {path}")
        else:
            print(f"{path} already has location /api/")
    except Exception as e:
        print(f"Error updating {path}: {e}")
