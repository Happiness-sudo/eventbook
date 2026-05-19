from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity
from extensions import db
from models.vendor_model import Vendor
import json


def _vendor_payload(v):
    """Returns a vendor dict with field names compatible with all pages."""
    return {
        "id": v.id,
        "user_id": v.user_id,
        "name": v.name,
        "businessName": v.name,
        "category": v.category,
        "location": v.location,
        "price": float(v.price) if v.price else 0,
        "priceRange": float(v.price) if v.price else 0,
        "image": v.image if v.image else "https://via.placeholder.com/300",
        "description": v.description,
        "rating": v.rating or 0,
    }


# GET ALL VENDORS
def get_all_vendors():
    try:
        vendors = Vendor.query.all()
        return jsonify([_vendor_payload(v) for v in vendors]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET ONE VENDOR BY ID
def get_vendor_by_id(id):
    try:
        vendor = db.session.get(Vendor, id)
        if not vendor:
            return jsonify({"error": "Vendor not found"}), 404
        return jsonify(_vendor_payload(vendor)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# CREATE VENDOR
def create_vendor():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        if not data.get("name") or not data.get("category"):
            return jsonify({"error": "Name and category are required"}), 400

        new_vendor = Vendor(
            user_id=data.get("user_id"),
            name=data.get("name"),
            category=data.get("category"),
            location=data.get("location"),
            price=data.get("price", 0),
            image=data.get("image"),
            description=data.get("description")
        )
        db.session.add(new_vendor)
        db.session.commit()
        return jsonify(new_vendor.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# UPDATE VENDOR
def update_vendor(id):
    try:
        vendor = db.session.get(Vendor, id)
        if not vendor:
            return jsonify({"error": "Vendor not found"}), 404
        data = request.get_json()
        vendor.name = data.get("name", vendor.name)
        vendor.category = data.get("category", vendor.category)
        vendor.location = data.get("location", vendor.location)
        vendor.price = data.get("price", vendor.price)
        vendor.image = data.get("image", vendor.image)
        vendor.description = data.get("description", vendor.description)
        db.session.commit()
        return jsonify(vendor.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# DELETE VENDOR
def delete_vendor(id):
    try:
        vendor = db.session.get(Vendor, id)
        if not vendor:
            return jsonify({"error": "Vendor not found"}), 404
        db.session.delete(vendor)
        db.session.commit()
        return jsonify({"message": "Vendor deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# GET MY VENDOR PROFILE (logged-in user)
def get_my_vendor_profile():
    try:
        identity_str = get_jwt_identity()
        identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
        vendor = Vendor.query.filter_by(user_id=identity["id"]).first()
        if not vendor:
            return jsonify({"error": "Vendor profile not found"}), 404
        return jsonify(vendor.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# UPDATE MY VENDOR PROFILE
def update_my_vendor_profile():
    try:
        identity_str = get_jwt_identity()
        identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
        vendor = Vendor.query.filter_by(user_id=identity["id"]).first()

        if not vendor:
            data = request.get_json() or {}
            vendor = Vendor(
                user_id=identity["id"],
                name=data.get("name", "My Business"),
                category=data.get("category", "General"),
                location=data.get("location"),
                price=data.get("price", 0),
                image=data.get("image"),
                description=data.get("description")
            )
            db.session.add(vendor)
            db.session.commit()
            return jsonify(vendor.to_dict()), 201

        data = request.get_json()
        vendor.name = data.get("name", vendor.name)
        vendor.category = data.get("category", vendor.category)
        vendor.location = data.get("location", vendor.location)
        vendor.price = data.get("price", vendor.price)
        vendor.image = data.get("image", vendor.image)
        vendor.description = data.get("description", vendor.description)
        db.session.commit()
        return jsonify(vendor.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500