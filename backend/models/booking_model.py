import json
import os
from datetime import datetime

BOOKINGS_FILE = os.path.join(os.path.dirname(__file__), '../data/bookings.json')

class Booking:
    def __init__(self, id, user_id, vendor_id, event_id, date, message, status, created_at=None):
        self.id = id
        self.user_id = user_id
        self.vendor_id = vendor_id
        self.event_id = event_id
        self.date = date
        self.message = message
        self.status = status  # pending, confirmed, cancelled, completed
        self.created_at = created_at or datetime.now().isoformat()

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'vendor_id': self.vendor_id,
            'event_id': self.event_id,
            'date': self.date,
            'message': self.message,
            'status': self.status,
            'created_at': self.created_at
        }

    @staticmethod
    def _load_data():
        if not os.path.exists(BOOKINGS_FILE):
            return []
        with open(BOOKINGS_FILE, 'r') as f:
            return json.load(f)

    @staticmethod
    def _save_data(bookings):
        with open(BOOKINGS_FILE, 'w') as f:
            json.dump(bookings, f, indent=2)

    @staticmethod
    def create(booking_data):
        bookings = Booking._load_data()
        new_id = max([b['id'] for b in bookings], default=0) + 1
        booking = Booking(
            id=new_id,
            user_id=booking_data['user_id'],
            vendor_id=booking_data['vendor_id'],
            event_id=booking_data.get('event_id'),
            date=booking_data['date'],
            message=booking_data.get('message', ''),
            status='pending'
        )
        bookings.append(booking.to_dict())
        Booking._save_data(bookings)
        return booking

    @staticmethod
    def find_by_id(booking_id):
        bookings = Booking._load_data()
        for b in bookings:
            if b['id'] == booking_id:
                return b
        return None

    @staticmethod
    def find_by_user(user_id):
        bookings = Booking._load_data()
        return [b for b in bookings if b['user_id'] == user_id]

    @staticmethod
    def find_by_vendor(vendor_id):
        bookings = Booking._load_data()
        return [b for b in bookings if b['vendor_id'] == vendor_id]

    @staticmethod
    def update_status(booking_id, status):
        bookings = Booking._load_data()
        for b in bookings:
            if b['id'] == booking_id:
                b['status'] = status
                Booking._save_data(bookings)
                return b
        return None
