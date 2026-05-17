from flask import Flask, jsonify, request
from flask_cors import CORS
from extensions import db, jwt
from routes.auth_routes import auth_bp
from routes.booking_routes import bookings_bp
from routes.vendor_routes import vendor_bp
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///eventbook.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key-change-in-production")

# Initialize extensions
db.init_app(app)
jwt.init_app(app)

# Enable CORS
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(bookings_bp, url_prefix="/api")
app.register_blueprint(vendor_bp, url_prefix="/api")

# Import models to register them with SQLAlchemy
from models.user_model import User
from models.vendor_model import Vendor
from models.booking_model import Booking, Event

# Home route
@app.route("/")
def home():
    return jsonify({"message": "EventBook API running", "status": "ok"}), 200

# Create tables on startup
with app.app_context():
    db.create_all()
    print("Database tables created/verified")

@app.route('/vendors', methods=['GET'])
def get_all_vendors():
    try:
        vendors_query = Vendor.query.all()
        vendors_list = []
        for v in vendors_query:
            vendors_list.append({
                "id": v.id,
                "businessName": v.name,
                "category": v.category,
                "location": v.location,
                "priceRange": v.price,
                "image": v.image if v.image else "https://via.placeholder.com/300",
                "description": v.description
            })
        return jsonify(vendors_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/vendors/<int:id>', methods=['GET'])
def get_vendor_by_id(id):
    try:
        vendor = db.session.get(Vendor, id)
        if not vendor:
            return jsonify({"error": "Vendor not found"}), 404
        return jsonify({
            "id": vendor.id,
            "name": vendor.name,
            "category": vendor.category,
            "location": vendor.location,
            "price": vendor.price,
            "image": vendor.image if vendor.image else "https://via.placeholder.com/300",
            "description": vendor.description,
            "rating": 5.0
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/bookings', methods=['POST'])
def create_booking_inline():
    try:
        data = request.get_json()


        vendor_id = data.get('vendorId') or data.get('vendor_id')
        user_id = data.get('userId') or data.get('user_id') or 1

        if not vendor_id:
            return jsonify({"error": "Vendor is required"}), 400

        new_booking = Booking(
            user_id=user_id,
            vendor_id=vendor_id,
            status=data.get('status', 'pending')
        )
        db.session.add(new_booking)
        db.session.commit()

        return jsonify({
            "message": "Booking created",
            "id": new_booking.id,
            "status": new_booking.status
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
@app.route('/bookings', methods=['GET'])
def get_all_bookings_inline():
    try:
        bookings = Booking.query.all()
        result = []
        for b in bookings:
            user = db.session.get(User, b.user_id)
            vendor = db.session.get(Vendor, b.vendor_id)
            result.append({
                "id": b.id,
                "userId": b.user_id,
                "vendorId": b.vendor_id,
                "userName": user.name if user else "Unknown",
                "vendorName": vendor.name if vendor else "Unknown",
                "status": b.status,
                "amount": (vendor.price if vendor and vendor.price else 0),
                "eventDate": b.created_at.isoformat() if b.created_at else None,
                "createdAt": b.created_at.isoformat() if b.created_at else None,
                "message": ""
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/bookings/<int:id>', methods=['PATCH'])
def update_booking_inline(id):
    try:
        booking = db.session.get(Booking, id)
        if not booking:
            return jsonify({"error": "Booking not found"}), 404

        data = request.get_json() or {}
        new_status = data.get('status')

        if not new_status:
            return jsonify({"error": "Status is required"}), 400

        booking.status = new_status
        db.session.commit()

        return jsonify({
            "id": booking.id,
            "status": booking.status,
            "message": "Booking updated"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)