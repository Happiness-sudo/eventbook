from extensions import db
from datetime import datetime


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )
    name = db.Column(db.String(150), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    budget = db.Column(db.Float, default=0)
    description = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    bookings = db.relationship("Booking", backref="event", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "date": self.date,
            "location": self.location,
            "budget": self.budget,
            "description": self.description,
            "created_at": self.created_at.isoformat()
        }


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )
    vendor_id = db.Column(
        db.Integer, db.ForeignKey("vendors.id"), nullable=False
    )
    event_id = db.Column(
        db.Integer, db.ForeignKey("events.id"), nullable=False
    )
    status = db.Column(db.String(20), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        user = self.user
        vendor = self.vendor
        event = self.event
        return {
            "id": self.id,
            "user_id": self.user_id,
            "vendor_id": self.vendor_id,
            "event_id": self.event_id,
            "status": self.status,
            "user_name": user.name if user else "",
            "vendor_name": vendor.name if vendor else "",
            "vendor_category": vendor.category if vendor else "",
            "event_name": event.name if event else "",
            "event_date": event.date if event else "",
            "event_location": event.location if event else "",
            "created_at": self.created_at.isoformat()
        }