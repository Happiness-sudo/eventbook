from flask import request, jsonify
from flask_jwt_extended import create_access_token
from extensions import db
from models.user_model import User
from models.vendor_model import Vendor
import bcrypt


def register():
    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    role = data.get("role", "user")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if role not in ["user", "vendor"]:
        role = "user"

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({"error": "Email already registered"}), 400

    hashed = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    user = User(name=name, email=email, password=hashed, role=role)
    db.session.add(user)
    db.session.commit()

    if role == "vendor":
        vendor = Vendor(
            user_id=user.id,
            name=name,
            category="General",
            location="Kenya"
        )
        db.session.add(vendor)
        db.session.commit()

    token = create_access_token(identity={
        "id": user.id,
        "role": user.role
    })

    return jsonify({
        "user": user.to_dict(),
        "token": token
    }), 201


def login():
    data = request.get_json()

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    match = bcrypt.checkpw(
        password.encode("utf-8"),
        user.password.encode("utf-8")
    )

    if not match:
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity={
        "id": user.id,
        "role": user.role
    })

    return jsonify({
        "user": user.to_dict(),
        "token": token
    }), 200