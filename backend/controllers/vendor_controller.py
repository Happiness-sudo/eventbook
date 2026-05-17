from flask import jsonify, request
from models.vendor_model import Vendor
import json
import os
import uuid

VENDORS_FILE = "data/vendors.json"


def read_vendors():
    """Safely reads vendors from the local JSON file."""
    if not os.path.exists(VENDORS_FILE):
        return []
    try:
        with open(VENDORS_FILE, "r") as file:
            return json.load(file)
    except Exception:
        return []


def save_vendors(vendors):
    """Saves vendors back to the local JSON file."""
    os.makedirs(os.path.dirname(VENDORS_FILE), exist_ok=True)
    with open(VENDORS_FILE, "w") as file:
        json.dump(vendors, file, indent=2)


def get_all_vendors():
    """Gets all vendors from JSON file first, falls back to Database."""
    vendors = read_vendors()
    
    # If JSON file is empty, try loading records from the SQL database
    if not vendors:
        try:
            db_vendors = Vendor.query.all()
            vendors = [v.to_dict() for v in db_vendors]
        except Exception as e:
            print(f"Database fetch failed: {e}")
            
    return jsonify(vendors), 200


def get_vendor_by_id(id):
    """Finds a vendor matching the ID from either JSON or Database."""
    # 1. Look inside the JSON file records
    vendors = read_vendors()
    for v in vendors:
        if str(v.get("id")).strip() == str(id).strip():
            return jsonify(v), 200

    # 2. Look inside the SQL Database tables
    try:
        db_vendor = Vendor.query.get(id)
        if db_vendor:
            return jsonify(db_vendor.to_dict()), 200
    except Exception as e:
        print(f"Database fallback lookup failed: {e}")

    # 3. If it can't be found anywhere
    return jsonify({"error": "Vendor not found"}), 404


def create_vendor():
    """Creates a new vendor and appends it to the dataset."""
    data = request.get_json()

    if not data.get("name") or not data.get("service"):
        return jsonify({"error": "Name and service are required"}), 400

    vendors = read_vendors()

    new_vendor = Vendor(
        id=str(uuid.uuid4()),
        name=data.get("name"),
        category=data.get("service"),  
        location=data.get("location"),
        price=data.get("price", 0),
        image=data.get("image"),
        description=data.get("description"),
        rating=data.get("rating", 5),
    )

    vendors.append(new_vendor.to_dict())
    save_vendors(vendors)

    return jsonify(new_vendor.to_dict()), 201


def update_vendor(id):
    """Updates a vendor profile matching the ID."""
    vendors = read_vendors()

    for vendor in vendors:
        if str(vendor.get("id")) == str(id):
            data = request.get_json()
            vendor["name"] = data.get("name", vendor.get("name"))
            vendor["service"] = data.get("service", vendor.get("service"))
            vendor["location"] = data.get("location", vendor.get("location"))
            vendor["price"] = data.get("price", vendor.get("price"))
            vendor["image"] = data.get("image", vendor.get("image"))
            vendor["description"] = data.get("description", vendor.get("description"))
            vendor["rating"] = data.get("rating", vendor.get("rating"))

            save_vendors(vendors)
            return jsonify(vendor), 200

    return jsonify({"error": "Vendor not found"}), 404