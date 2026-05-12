from models.booking_model import Booking
from models.user_model import User
from models.vendor_model import Vendor
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

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

def create_booking(data, current_user):
    """Create a new booking"""
    booking = Booking.create({
        'user_id': current_user['id'],
        'vendor_id': data['vendor_id'],
        'event_id': data.get('event_id'),
        'date': data['date'],
        'message': data.get('message', '')
    })
    
    # Get vendor email
    vendor = Vendor.find_by_id(data['vendor_id'])
    if vendor:
        user = User.find_by_id(vendor['user_id'])
        if user:
            send_email(
                to_email=user['email'],
                subject='New Booking Request',
                body=f"You have a new booking request from {current_user['name']} for {data['date']}."
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
    
    # Get user email
    user = User.find_by_id(booking['user_id'])
    if user:
        send_email(
            to_email=user['email'],
            subject=f'Booking {status.capitalize()}',
            body=f"Your booking has been {status}."
        )
    
    return booking
