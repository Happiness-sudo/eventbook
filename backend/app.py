from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.vendor_routes import vendor_bp
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(vendor_bp)

@app.route("/")
def home():
    return {
        "message": "EventBook Backend Running"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=port)