from flask import Blueprint
from controllers.vendor_controller import (
    get_all_vendors,
    get_vendor_by_id,
    create_vendor,
    update_vendor,
    delete_vendor,
    get_my_vendor_profile,
    update_my_vendor_profile,
)
from middleware.auth_middleware import login_required

vendor_bp = Blueprint("vendor_bp", __name__)


# Public routes
@vendor_bp.route("/vendors", methods=["GET"])
def list_vendors():
    return get_all_vendors()


@vendor_bp.route("/vendors/<int:id>", methods=["GET"])
def get_vendor(id):
    return get_vendor_by_id(id)


@vendor_bp.route("/vendors", methods=["POST"])
def new_vendor():
    return create_vendor()


@vendor_bp.route("/vendors/<int:id>", methods=["PUT"])
def edit_vendor(id):
    return update_vendor(id)


@vendor_bp.route("/vendors/<int:id>", methods=["DELETE"])
def remove_vendor(id):
    return delete_vendor(id)


# Logged-in vendor's own profile
@vendor_bp.route("/vendors/me", methods=["GET"])
@login_required
def my_profile(current_user):
    return get_my_vendor_profile()


@vendor_bp.route("/vendors/me", methods=["PUT"])
@login_required
def update_my_profile(current_user):
    return update_my_vendor_profile()