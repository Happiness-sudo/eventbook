
from flask import Blueprint
from controllers.vendor_controller import (
    get_all_vendors,
    get_vendor_by_id,
    create_vendor,
    update_vendor,
)


vendor_bp = Blueprint("vendor_bp", __name__)


@vendor_bp.route("/vendors", methods=["GET"])
def list_vendors():
    return get_all_vendors()


@vendor_bp.route('/vendors/<string:id>', methods=['GET']) 
def get_vendor(id):
    return get_vendor_by_id(id)

@vendor_bp.route("/vendors", methods=["POST"])
def new_vendor():
    return create_vendor()


@vendor_bp.route("/vendors/<int:id>", methods=["PUT"])
def edit_vendor(id):
    return update_vendor(id)

