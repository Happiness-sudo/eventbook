from flask import Blueprint, request, jsonify
from utils.file_handler import read_data, write_data
import uuid

vendor_bp = Blueprint("vendor_bp", __name__)

@vendor_bp.route("/vendors", methods=["GET"])
def get_vendors():
    try:
        vendors = read_data("vendors.json")
        return jsonify(vendors), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@vendor_bp.route("/vendors", methods=["POST"])
def create_vendor():
    try:
        data = request.json

        required_fields = [
            "name",
            "service",
            "price",
            "location"
        ]

        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "error": f"{field} is required"
                }), 400

        new_vendor = {
            "id": str(uuid.uuid4()),
            "name": data.get("name"),
            "service": data.get("service"),
            "price": data.get("price"),
            "location": data.get("location"),
            "image": data.get("image"),
            "description": data.get("description")
        }

        vendors = read_data("vendors.json")
        vendors.append(new_vendor)

        write_data("vendors.json", vendors)

        return jsonify({
            "message": "Vendor created successfully",
            "vendor": new_vendor
        }), 201

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500