from flask import jsonify, request
from app import db
from models.vendor_model import Vendor


def get_all_vendors():
    vendors = Vendor.query.all()
    return jsonify([v.to_dict() for v in vendors]), 200


def get_vendor_by_id(id):
    vendor = Vendor.query.get(id)
    if not vendor:
        return jsonify({"error": "Vendor not found"}), 404
    return jsonify(vendor.to_dict()), 200


def create_vendor():
    data = request.get_json()

    if not data.get("name") or not data.get("category"):
        return jsonify({"error": "Name and category are required"}), 400

    new_vendor = Vendor(
        name=data.get("name"),
        category=data.get("category"),
        location=data.get("location"),
        price=data.get("price", 0),
        image=data.get("image"),
        description=data.get("description"),
        rating=data.get("rating", 0),
        user_id=data.get("user_id"),
    )

    db.session.add(new_vendor)
    db.session.commit()

    return jsonify(new_vendor.to_dict()), 201


def update_vendor(id):
    vendor = Vendor.query.get(id)
    if not vendor:
        return jsonify({"error": "Vendor not found"}), 404

    data = request.get_json()

    if "name" in data:
        vendor.name = data["name"]
    if "category" in data:
        vendor.category = data["category"]
    if "location" in data:
        vendor.location = data["location"]
    if "price" in data:
        vendor.price = data["price"]
    if "image" in data:
        vendor.image = data["image"]
    if "description" in data:
        vendor.description = data["description"]
    if "rating" in data:
        vendor.rating = data["rating"]

    db.session.commit()

    return jsonify(vendor.to_dict()), 200