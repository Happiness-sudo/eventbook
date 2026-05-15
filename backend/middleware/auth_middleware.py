from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity


def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except Exception:
            return jsonify({"error": "Login required"}), 401
        return fn(*args, **kwargs)
    return wrapper


def role_required(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
                identity = get_jwt_identity()
                if identity.get("role") != role:
                    return jsonify({"error": f"{role} access only"}), 403
            except Exception:
                return jsonify({"error": "Login required"}), 401
            return fn(*args, **kwargs)
        return wrapper
    return decorator


def vendor_required(fn):
    return role_required("vendor")(fn)


def admin_required(fn):
    return role_required("admin")(fn)


def user_required(fn):
    return role_required("user")(fn)