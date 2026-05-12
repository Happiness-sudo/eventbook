from flask import Blueprint, request, jsonify
from utils.file_handler import read_data, write_data

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    users = read_data("users.json")

    new_user = {
        "id": len(users) + 1,
        "name": data["name"],
        "email": data["email"],
        "password": data["password"]
    }

    users.append(new_user)

    write_data("users.json", users)

    return jsonify({
        "message": "User registered",
        "user": new_user
    }), 201