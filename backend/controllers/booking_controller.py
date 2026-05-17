from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from extensions import db
from models.booking_model import Booking, Event
from models.vendor_model import Vendor
from models.user_model import User
import os
import requests
import json


def send_email(to_email, template_params):
    """Send email using EmailJS REST API directly"""
    url = "https://api.emailjs.com/api/v1.0/email/send"
    
    payload = {
        'service_id': os.getenv('EMAILJS_SERVICE_ID'),
        'template_id': os.getenv('EMAILJS_TEMPLATE_ID'),
        'user_id': os.getenv('EMAILJS_USER_ID'),
        'accessToken': os.getenv('EMAILJS_ACCESS_TOKEN'),
        'template_params': {
            'email': to_email,
            'customer_name': template_params.get('customer_name', 'Customer'),
            'booking_date': template_params.get('booking_date', ''),
            'booking_id': str(template_params.get('booking_id', '')),
            'message': template_params.get('message', '')
        }
    }
    
    headers = {'Content-Type': 'application/json'}
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Email API response: {response.status_code} - {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Email error: {e}")
        return False


def create_booking():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
    data = request.get_json()

    vendor_id = data.get("vendor_id")
    event_id = data.get("event_id")

    if not vendor_id or not event_id:
        return jsonify({"error": "Vendor and event are required"}), 400

    existing = Booking.query.filter_by(
        user_id=identity["id"],
        vendor_id=vendor_id,
        event_id=event_id
    ).first()

    if existing:
        return jsonify({"error": "You already booked this vendor for this event"}), 400

    booking = Booking(
        user_id=identity["id"],
        vendor_id=vendor_id,
        event_id=event_id,
        status="pending"
    )

    db.session.add(booking)
    db.session.commit()
    
    vendor = Vendor.query.get(vendor_id)
    if vendor and vendor.user_id:
        vendor_user = User.query.get(vendor.user_id)
        booking_user = User.query.get(identity["id"])
        if vendor_user and vendor_user.email:
            send_email(
                to_email=vendor_user.email,
                template_params={
                    'customer_name': booking_user.name if booking_user else 'Customer',
                    'booking_date': booking.created_at.isoformat() if booking.created_at else '',
                    'booking_id': booking.id,
                    'message': f"New booking request for event ID {event_id}."
                }
            )
    
    return jsonify(booking.to_dict()), 201


def get_my_bookings():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
    bookings = Booking.query.filter_by(user_id=identity["id"]).all()
    return jsonify([b.to_dict() for b in bookings]), 200


def get_vendor_bookings():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
    vendor = Vendor.query.filter_by(user_id=identity["id"]).first()
    if not vendor:
        return jsonify({"error": "Vendor profile not found"}), 404
    bookings = Booking.query.filter_by(vendor_id=vendor.id).all()
    return jsonify([b.to_dict() for b in bookings]), 200


def update_booking_status(booking_id):
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
    vendor = Vendor.query.filter_by(user_id=identity["id"]).first()
    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    if booking.vendor_id != vendor.id:
        return jsonify({"error": "Not allowed"}), 403

    data = request.get_json()
    status = data.get("status")

    if status not in ["accepted", "rejected"]:
        return jsonify({"error": "Status must be accepted or rejected"}), 400

    booking.status = status
    db.session.commit()
    
    user = User.query.get(booking.user_id)
    if user and user.email:
        send_email(
            to_email=user.email,
            template_params={
                'customer_name': user.name,
                'booking_date': booking.created_at.isoformat() if booking.created_at else '',
                'booking_id': booking.id,
                'message': f"Your booking #{booking.id} has been {status}."
            }
        )
    
    return jsonify(booking.to_dict()), 200


def create_event():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
    data = request.get_json()

    name = data.get("name", "").strip()
    date = data.get("date", "").strip()
    location = data.get("location", "").strip()

    if not name or not date or not location:
        return jsonify({"error": "Name, date and location are required"}), 400

    event = Event(
        user_id=identity["id"],
        name=name,
        date=date,
        location=location,
        budget=data.get("budget", 0),
        description=data.get("description", "")
    )

    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201


def get_my_events():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str) if isinstance(identity_str, str) else identity_str
    events = Event.query.filter_by(user_id=identity["id"]).all()
    return jsonify([e.to_dict() for e in events]), 200


def get_all_bookings():
    bookings = Booking.query.all()
    return jsonify([b.to_dict() for b in bookings]), 200


def get_all_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200
