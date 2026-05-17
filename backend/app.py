from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, jwt
from routes.auth_routes import auth_bp
from routes.booking_routes import bookings_bp
from routes.vendor_routes import vendor_bp
import os

app = Flask(__name__)

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

if __name__ == "__main__":

    app.run(debug=True)