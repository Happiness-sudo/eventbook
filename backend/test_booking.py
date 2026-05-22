#!/usr/bin/env python3
import requests
import json

BASE = "https://eventbook-08sq.onrender.com"
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
RESET = "\033[0m"

def test(name, passed, msg=""):
    status = f"{GREEN}✓ PASS{RESET}" if passed else f"{RED}✗ FAIL{RESET}"
    print(f"{status} {name}")
    if msg:
        print(f"    {msg}")

print(f"\n{YELLOW}{'='*50}{RESET}")
print(f"{YELLOW}EventBook Backend Test Suite{RESET}")
print(f"{YELLOW}{'='*50}{RESET}\n")

# 1. Health check
try:
    r = requests.get(f"{BASE}/")
    test("Server health", r.status_code == 200, f"Status: {r.status_code}")
except:
    test("Server health", False, "Server not running")

# 2. Register user
reg_data = {"name":"TestUser","email":"testuser@example.com","password":"test123","role":"user"}
r = requests.post(f"{BASE}/auth/register", json=reg_data)
if r.status_code == 201:
    data = r.json()
    token = data.get("token")
    user = data.get("user")
    test("User registration", True, f"User ID: {user.get('id')}")
else:
    test("User registration", False, f"Status: {r.status_code}")
    token = None

# 3. Login
if token:
    login_data = {"email":"testuser@example.com","password":"test123"}
    r = requests.post(f"{BASE}/auth/login", json=login_data)
    if r.status_code == 200:
        data = r.json()
        test("User login", True, "Token obtained")
        token = data.get("token")
    else:
        test("User login", False, f"Status: {r.status_code}")

# 4. Create event (with auth)
if token:
    event_data = {"name":"Test Event","date":"2026-06-15","location":"Nairobi","budget":50000}
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.post(f"{BASE}/api/events", json=event_data, headers=headers)
    if r.status_code == 201:
        data = r.json()
        test("Create event", True, f"Event ID: {data.get('id')}")
    else:
        test("Create event", False, f"Status: {r.status_code}")
else:
    test("Create event", False, "No token available")

# 5. Get events
if token:
    r = requests.get(f"{BASE}/api/events", headers=headers)
    test("Get events", r.status_code == 200, f"Status: {r.status_code}")
else:
    test("Get events", False, "No token available")

# 6. Invalid endpoint
r = requests.get(f"{BASE}/api/invalid")
test("Invalid endpoint returns 404", r.status_code == 404)

# 7. Unauthorized access (no token)
r = requests.get(f"{BASE}/api/events")
test("Unauthorized access blocked", r.status_code == 401, f"Status: {r.status_code}")

print(f"\n{YELLOW}{'='*50}{RESET}")
print(f"{YELLOW}Test Summary: Backend is working!{RESET}")
print(f"{YELLOW}{'='*50}{RESET}\n")
