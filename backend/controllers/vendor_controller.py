from utils.file_handler import read_data, write_data
from models.vendor_model import build_vendor
import uuid
import os
import requests


# fetch image from Unsplash 
def fetch_unsplash_image(service):
    api_key = os.environ.get("UNSPLASH_KEY")
    if not api_key:
        return None

    try:
        url = "https://api.unsplash.com/photos/random"
        headers = {"Authorization": f"Client-ID {api_key}"}
        params = {"query": service, "orientation": "landscape"}
        response = requests.get(url, headers=headers, params=params, timeout=5)

        if response.status_code == 200:
            data = response.json()
            return data["urls"]["regular"]
    except Exception as e:
        print("Could not fetch image:", e)

    return None


# Get all vendors
def get_all_vendors():
    return read_data("vendors.json")


# Get one vendor by id
def get_vendor_by_id(vendor_id):
    vendors = read_data("vendors.json")
    for v in vendors:
        if v.get("id") == vendor_id:
            return v
    return None


# Create new vendor
def create_vendor(data):
    # Check required fields
    required_fields = ["name", "service", "price", "location"]
    for field in required_fields:
        if not data.get(field):
            return None, f"{field} is required"

    # If no image, get one from Unsplash
    if not data.get("image"):
        data["image"] = fetch_unsplash_image(data.get("service"))

    new_vendor = build_vendor(data, str(uuid.uuid4()))

    vendors = read_data("vendors.json")
    vendors.append(new_vendor)
    write_data("vendors.json", vendors)

    return new_vendor, None


# Update existing vendor
def update_vendor(vendor_id, data):
    vendors = read_data("vendors.json")

    vendor = None
    for v in vendors:
        if v.get("id") == vendor_id:
            vendor = v
            break

    if not vendor:
        return None

    # Update only the fields that were sent
    if "name" in data:
        vendor["name"] = data["name"]
    if "service" in data:
        vendor["service"] = data["service"]
    if "price" in data:
        vendor["price"] = data["price"]
    if "location" in data:
        vendor["location"] = data["location"]
    if "image" in data:
        vendor["image"] = data["image"]
    if "description" in data:
        vendor["description"] = data["description"]

    write_data("vendors.json", vendors)
    return vendor