import os
import requests
from models.booking_model import Booking
from models.user_model import User
from models.vendor_model import Vendor

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
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Email API response: {response.status_code} - {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Email error: {e}")
        return False

def create_booking(data, current_user):
    """Create a new booking"""
    booking = Booking.create({
        'user_id': current_user['id'],
        'vendor_id': data['vendor_id'],
        'event_id': data.get('event_id'),
        'date': data['date'],
        'message': data.get('message', '')
    })
    
    # Get vendor email and send notification
    vendor = Vendor.find_by_id(data['vendor_id'])
    if vendor:
        user = User.find_by_id(vendor['user_id'])
        if user and user.get('email'):
            send_email(
                to_email=user['email'],
                template_params={
                    'customer_name': current_user.get('name', 'Customer'),
                    'booking_date': data['date'],
                    'booking_id': booking.id,
                    'message': data.get('message', 'No message')
                }
            )
    
    return booking

def get_user_bookings(user_id):
    """Get all bookings for a user"""
    return Booking.find_by_user(user_id)

def get_vendor_bookings(vendor_id):
    """Get all booking requests for a vendor"""
    return Booking.find_by_vendor(vendor_id)

def update_booking_status(booking_id, status, current_user):
    """Update booking status and notify user"""
    booking = Booking.update_status(booking_id, status)
    if not booking:
        return None
    
    # Get user email and send notification
    user = User.find_by_id(booking['user_id'])
    if user and user.get('email'):
        send_email(
            to_email=user['email'],
            template_params={
                'customer_name': user.get('name', 'Customer'),
                'booking_date': booking['date'],
                'booking_id': booking['id'],
                'message': f"Your booking has been {status}"
            }
        )
    
    return booking