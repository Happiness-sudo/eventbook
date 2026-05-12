from flask import Blueprint, request, jsonify
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'eventbook-secret-key-change-in-production')

# Simple test login (for development only)
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Test credentials (in production, check against database)
    if email == 'vendor@example.com' and password == 'password':
        token = jwt.encode({
            'user_id': 2,
            'name': 'Test Vendor',
            'role': 'vendor',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token, 'user': {'id': 2, 'name': 'Test Vendor', 'role': 'vendor'}}), 200
    
    elif email == 'user@example.com' and password == 'password':
        token = jwt.encode({
            'user_id': 1,
            'name': 'Test User',
            'role': 'user',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token, 'user': {'id': 1, 'name': 'Test User', 'role': 'user'}}), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401
