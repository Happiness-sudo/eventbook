from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Import blueprints
from routes.auth_routes import auth_bp
from routes.booking_routes import booking_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(booking_bp, url_prefix='/api')

@app.route("/")
def home():
    return {"message": "EventBook Flask Backend Running"}

if __name__ == "__main__":
    app.run(debug=True, port=5000)
