from flask import jsonify, request
from models.vendor_model import Vendor
import json
import os
import uuid

VENDORS_FILE = "data/vendors.json"


def read_vendors():
    if not os.path.exists(VENDORS_FILE):
        return []

    with open(VENDORS_FILE, "r") as file:
        return json.load(file)


def save_vendors(vendors):
    with open(VENDORS_FILE, "w") as file:
        json.dump(vendors, file, indent=2)


def get_all_vendors():
    vendors = read_vendors()
    return jsonify(vendors), 200


def get_vendor_by_id(id):
    vendors = read_vendors()

    for vendor in vendors:
        if vendor["id"] == id:
            return jsonify(vendor), 200

    return jsonify({"error": "Vendor not found"}), 404


def create_vendor():
    data = request.get_json()

    if not data.get("name") or not data.get("service"):
        return jsonify(
            {"error": "Name and service are required"}
        ), 400

    vendors = read_vendors()

    new_vendor = Vendor(
        id=str(uuid.uuid4()),
        name=data.get("name"),
        service=data.get("service"),
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
    vendors = read_vendors()

    for vendor in vendors:
        if vendor["id"] == id:

            data = request.get_json()

            vendor["name"] = data.get(
                "name",
                vendor["name"]
            )

            vendor["service"] = data.get(
                "service",
                vendor["service"]
            )

            vendor["location"] = data.get(
                "location",
                vendor["location"]
            )

            vendor["price"] = data.get(
                "price",
                vendor["price"]
            )

            vendor["image"] = data.get(
                "image",
                vendor["image"]
            )

            vendor["description"] = data.get(
                "description",
                vendor["description"]
            )

            vendor["rating"] = data.get(
                "rating",
                vendor["rating"]
            )

            save_vendors(vendors)

            return jsonify(vendor), 200

    return jsonify({"error": "Vendor not found"}), 404