from flask import Blueprint, jsonify
from controllers.booking_controller import (
    create_booking, get_my_bookings, get_vendor_bookings,
    update_booking_status, create_event, get_my_events,
    get_all_bookings, get_all_users
)
from middleware.auth_middleware import (
    login_required, vendor_required, admin_required
)

bookings_bp = Blueprint("bookings", __name__)

# Test route
@bookings_bp.route("/test", methods=["GET"])
def test_route():
    return jsonify({"message": "Blueprint is working"}), 200

# Events
@bookings_bp.route("/events", methods=["POST"])
@login_required
def create_event_route(current_user):
    return create_event()

@bookings_bp.route("/events", methods=["GET"])
@login_required
def get_my_events_route(current_user):
    return get_my_events()

# Bookings
@bookings_bp.route("/bookings", methods=["POST"])
@login_required
def create_booking_route(current_user):
    return create_booking()

@bookings_bp.route("/bookings", methods=["GET"])
@login_required
def get_my_bookings_route(current_user):
    return get_my_bookings()

@bookings_bp.route("/bookings/vendor", methods=["GET"])
@vendor_required
def get_vendor_bookings_route(current_user):
    return get_vendor_bookings()

@bookings_bp.route("/bookings/<int:booking_id>/status", methods=["PATCH"])
@vendor_required
def update_booking_status_route(current_user, booking_id):
    return update_booking_status(booking_id)

# Admin
@bookings_bp.route("/admin/bookings", methods=["GET"])
@admin_required
def get_all_bookings_route(current_user):
    return get_all_bookings()

@bookings_bp.route("/admin/users", methods=["GET"])
@admin_required
def get_all_users_route(current_user):
    return get_all_users()
