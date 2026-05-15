from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from extensions import db
from models.booking_model import Booking, Event
from models.vendor_model import Vendor
from models.user_model import User
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to_email, subject, body):
    """Send email using SMTP (configure with your email settings)"""
    try:
        smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.getenv('SMTP_PORT', 587))
        smtp_user = os.getenv('SMTP_USER')
        smtp_password = os.getenv('SMTP_PASSWORD')
        
        if not smtp_user or not smtp_password:
            print(f"Email not configured. Would have sent to {to_email}: {subject}")
            return
        
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")

def create_booking():
    identity = get_jwt_identity()
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
        return jsonify({
            "error": "You already booked this vendor for this event"
        }), 400

    booking = Booking(
        user_id=identity["id"],
        vendor_id=vendor_id,
        event_id=event_id,
        status="pending"
    )

    db.session.add(booking)
    db.session.commit()
    
    # Send email to vendor
    vendor = Vendor.query.get(vendor_id)
    if vendor and vendor.user_id:
        user = User.query.get(vendor.user_id)
        if user and user.email:
            send_email(
                to_email=user.email,
                subject=f"New Booking Request #{booking.id}",
                body=f"You have a new booking request for event ID {event_id}. Log in to your vendor dashboard to approve or reject."
            )
    
    return jsonify(booking.to_dict()), 201

def get_my_bookings():
    identity = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=identity["id"]).all()
    return jsonify([b.to_dict() for b in bookings]), 200

def get_vendor_bookings():
    identity = get_jwt_identity()
    vendor = Vendor.query.filter_by(user_id=identity["id"]).first()

    if not vendor:
        return jsonify({"error": "Vendor profile not found"}), 404

    bookings = Booking.query.filter_by(vendor_id=vendor.id).all()
    return jsonify([b.to_dict() for b in bookings]), 200

def update_booking_status(booking_id):
    identity = get_jwt_identity()
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
    
    # Send email to user
    user = User.query.get(booking.user_id)
    if user and user.email:
        send_email(
            to_email=user.email,
            subject=f"Booking {status.capitalize()}",
            body=f"Your booking #{booking.id} has been {status}."
        )
    
    return jsonify(booking.to_dict()), 200

def create_event():
    identity = get_jwt_identity()
    data = request.get_json()

    name = data.get("name", "").strip()
    date = data.get("date", "").strip()
    location = data.get("location", "").strip()

    if not name or not date or not location:
        return jsonify({
            "error": "Name, date and location are required"
        }), 400

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
    identity = get_jwt_identity()
    events = Event.query.filter_by(user_id=identity["id"]).all()
    return jsonify([e.to_dict() for e in events]), 200

def get_all_bookings():
    bookings = Booking.query.all()
    return jsonify([b.to_dict() for b in bookings]), 200

def get_all_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200