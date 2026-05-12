from flask import Blueprint, request, jsonify
from middleware.auth_middleware import token_required, vendor_required
from controllers.booking_controller import (
    create_booking, get_user_bookings, get_vendor_bookings, update_booking_status
)

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/bookings', methods=['POST'])
@token_required
def create_booking_route(current_user):
    data = request.get_json()
    
    if not data.get('vendor_id') or not data.get('date'):
        return jsonify({'error': 'vendor_id and date are required'}), 400
    
    booking = create_booking(data, current_user)
    return jsonify(booking.to_dict()), 201

@booking_bp.route('/bookings', methods=['GET'])
@token_required
def get_bookings_route(current_user):
    bookings = get_user_bookings(current_user['id'])
    return jsonify(bookings), 200

@booking_bp.route('/bookings/vendor', methods=['GET'])
@token_required
@vendor_required
def get_vendor_bookings_route(current_user):
    from models.vendor_model import Vendor
    vendor = Vendor.find_by_user_id(current_user['id'])
    if not vendor:
        return jsonify({'error': 'Vendor profile not found'}), 404
    bookings = get_vendor_bookings(vendor['id'])
    return jsonify(bookings), 200

@booking_bp.route('/bookings/<int:booking_id>/status', methods=['PATCH'])
@token_required
def update_booking_status_route(current_user, booking_id):
    data = request.get_json()
    status = data.get('status')
    
    if status not in ['pending', 'confirmed', 'cancelled', 'completed']:
        return jsonify({'error': 'Invalid status'}), 400
    
    booking = update_booking_status(booking_id, status, current_user)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    return jsonify(booking), 200
