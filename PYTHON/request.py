import requests

# Making GET request
print(requests.__version__)
url = "https://jsonplaceholder.typicode.com/todos/1"
response = requests.get(url)
print(response.status_code)  # 200 means success
print(response.text)  # raw HTML or JSON as string
print(response.json())  # parse JSON directly to Python dict

# Making POST request
url = "https://jsonplaceholder.typicode.com/posts"
data = {"title": "My New Post", "body": "This is the content of my post", "userId": 1}
response = requests.post(url, json=data)
print(response.status_code)  # 201 means created
print(response.json())

# Adding Headers
headers = {"Authorization": "Bearer YOUR_API_TOKEN", "Content-Type": "application/json"}
response = requests.get("https://api.example.com/data", headers=headers)
print(response.json())

# Passing Query parameters in GET request
params = {"userId": 1}
response = requests.get("https://jsonplaceholder.typicode.com/todos", params=params)
print(response.json())

# Handling request error
try:
    response = requests.get("https://jsonplaceholder.typicode.com/todos/999")
    response.raise_for_status()  # raises an error for 4xx or 5xx
    print(response.json())
except requests.exceptions.HTTPError as err:
    print(f"HTTP error occurred: {err}")
except requests.exceptions.RequestException as e:
    print(f"Other error: {e}")

# Downloading request files
url = "https://www.example.com/sample.pdf"
response = requests.get(url)

with open("sample.pdf", "wb") as f:
    f.write(response.content)

# Session objects
"""
If you make multiple requests to the same site and want to reuse cookies or headers
"""
session = requests.Session()
session.headers.update({"User-Agent": "MyApp/1.0"})

response = session.get("https://httpbin.org/cookies/set/sessioncookie/123456789")
print(response.text)

# Next requests reuse the same session
response = session.get("https://httpbin.org/cookies")
print(response.json())
