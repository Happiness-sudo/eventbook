from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
import json


def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            identity_str = get_jwt_identity()
            # Parse the JSON string back to dict
            current_user = json.loads(identity_str)
        except Exception as e:
            return jsonify({"error": f"Login required: {str(e)}"}), 401
        return fn(current_user, *args, **kwargs)
    return wrapper


def role_required(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
                identity_str = get_jwt_identity()
                identity = json.loads(identity_str)
                if identity.get("role") != role:
                    return jsonify({"error": f"{role} access only"}), 403
            except Exception as e:
                return jsonify({"error": f"Login required: {str(e)}"}), 401
            return fn(identity, *args, **kwargs)
        return wrapper
    return decorator


def vendor_required(fn):
    return role_required("vendor")(fn)


def admin_required(fn):
    return role_required("admin")(fn)


def user_required(fn):
    return role_required("user")(fn)
