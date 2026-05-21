from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from extensions import db, jwt, migrate
from routes.auth_routes import auth_bp
from routes.booking_routes import bookings_bp
from routes.vendor_routes import vendor_bp
import os

# Load environment variables from .env
load_dotenv()

# Import models so SQLAlchemy can register them
from models.user_model import User
from models.vendor_model import Vendor
from models.booking_model import Booking, Event

app = Flask(__name__)

# Config
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL",
    "sqlite:///eventbook.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY",
    "super-secret-key-change-in-production"
)

# Init extensions
db.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)

# Allow the frontend to talk to the API
CORS(
    app,
    resources={r"/*": {"origins": [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]}}
)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(bookings_bp, url_prefix="/api")
app.register_blueprint(vendor_bp, url_prefix="/api")


# Home
@app.route("/")
def home():
    return jsonify({
        "message": "EventBook API running",
        "status": "ok"
    }), 200

if __name__ == "__main__":
    app.run(debug=True)