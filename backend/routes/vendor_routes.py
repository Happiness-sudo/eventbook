from flask import Blueprint, request, jsonify
from utils.file_handler import read_data, write_data
import uuid
import os
import requests

vendor_bp = Blueprint("vendor_bp", __name__)
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

@vendor_bp.route("/vendors", methods=["GET"])
def get_vendors():
    try:
        vendors = read_data("vendors.json")
        return jsonify(vendors), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
    
# GET single vendor by id
@vendor_bp.route("/vendors/<string:id>", methods=["GET"])
def get_vendor(id):
    try:
        vendors = read_data("vendors.json")
        for v in vendors:
            if v.get("id") == id:
                return jsonify(v), 200
        return jsonify({"error": "Vendor not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@vendor_bp.route("/vendors", methods=["POST"])
def create_vendor():
    try:
        data = request.json

        required_fields = ["name", "service", "price", "location"]

        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"{field} is required"}), 400

        #get one from Unsplash
        image = data.get("image")
        if not image:
            image = fetch_unsplash_image(data.get("service"))

        new_vendor = {
            "id": str(uuid.uuid4()),
            "name": data.get("name"),
            "service": data.get("service"),
            "price": data.get("price"),
            "location": data.get("location"),
            "image": image,
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
        return jsonify({"error": str(e)}), 500


# PUT update existing vendor
@vendor_bp.route("/vendors/<string:id>", methods=["PUT"])
def update_vendor(id):
    try:
        data = request.json
        vendors = read_data("vendors.json")

        vendor = None
        for v in vendors:
            if v.get("id") == id:
                vendor = v
                break

        if not vendor:
            return jsonify({"error": "Vendor not found"}), 404

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

        return jsonify({
            "message": "Vendor updated successfully",
            "vendor": vendor
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500