from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# -------------------------
# DATABASE CONFIG
# -------------------------
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///eventbook.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# -------------------------
# USER MODEL
# -------------------------
class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(120),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        default="user"
    )

# -------------------------
# VENDOR MODEL
# -------------------------
class Vendor(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    business_name = db.Column(
        db.String(120),
        nullable=False
    )

    category = db.Column(
        db.String(120),
        nullable=False
    )

    location = db.Column(
        db.String(120),
        nullable=False
    )

    price_range = db.Column(
        db.String(120),
        nullable=False
    )

    image = db.Column(db.Text)

    description = db.Column(db.Text)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id")
    )

# -------------------------
# CREATE DATABASE
# -------------------------
with app.app_context():
    db.create_all()

# -------------------------
# HOME
# -------------------------
@app.route("/")
def home():

    return jsonify({
        "message": "EventBook API running"
    })

# -------------------------
# REGISTER
# -------------------------
@app.route("/auth/register", methods=["POST"])
def register():

    data = request.json

    existing_user = User.query.filter_by(
        email=data["email"]
    ).first()

    if existing_user:

        return jsonify({
            "message": "Email already exists"
        }), 400

    new_user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        role=data.get("role", "user")
    )

    db.session.add(new_user)

    db.session.commit()

    return jsonify({

        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        },

        "token": "fake-jwt-token"

    }), 201

# -------------------------
# LOGIN
# -------------------------
@app.route("/auth/login", methods=["POST"])
def login():

    data = request.json

    user = User.query.filter_by(
        email=data["email"],
        password=data["password"]
    ).first()

    if not user:

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    return jsonify({

        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        },

        "token": "fake-jwt-token"

    })

# -------------------------
# CREATE VENDOR PROFILE
# -------------------------
@app.route("/vendors", methods=["POST"])
def create_vendor():

    data = request.json

    new_vendor = Vendor(

        business_name=data["businessName"],

        category=data["category"],

        location=data["location"],

        price_range=data["priceRange"],

        image=data["image"],

        description=data["description"],

        user_id=data.get("userId")

    )

    db.session.add(new_vendor)

    db.session.commit()

    return jsonify({
        "message": "Vendor profile created successfully"
    }), 201

# -------------------------
# GET ALL VENDORS
# -------------------------
@app.route("/vendors", methods=["GET"])
def get_vendors():

    vendors = Vendor.query.all()

    vendor_list = []

    for vendor in vendors:

        vendor_list.append({

            "id": vendor.id,

            "business_name": vendor.business_name,

            "category": vendor.category,

            "location": vendor.location,

            "price_range": vendor.price_range,

            "image": vendor.image,

            "description": vendor.description

        })

    return jsonify(vendor_list)

# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":

    app.run(debug=True)