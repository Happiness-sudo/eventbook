from flask import Blueprint
from controllers.booking_controller import (
    create_booking, get_my_bookings, get_vendor_bookings,
    update_booking_status, create_event, get_my_events,
    get_all_bookings, get_all_users
)
from middleware.auth_middleware import (
    login_required, vendor_required, admin_required
)

bookings_bp = Blueprint("bookings", __name__)

# Events
bookings_bp.route("/events",        methods=["POST"])(login_required(create_event))
bookings_bp.route("/events",        methods=["GET"])(login_required(get_my_events))

# Bookings
bookings_bp.route("/bookings",      methods=["POST"])(login_required(create_booking))
bookings_bp.route("/bookings",      methods=["GET"])(login_required(get_my_bookings))
bookings_bp.route("/bookings/vendor", methods=["GET"])(vendor_required(get_vendor_bookings))
bookings_bp.route("/bookings/<int:booking_id>/status", methods=["PATCH"])(vendor_required(update_booking_status))

# Admin
bookings_bp.route("/admin/bookings", methods=["GET"])(admin_required(get_all_bookings))
bookings_bp.route("/admin/users",    methods=["GET"])(admin_required(get_all_users))