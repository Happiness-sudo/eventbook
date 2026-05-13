from app import db
from datetime import datetime


class Vendor(db.Model):
    __tablename__ = "vendors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(60), nullable=False)
    location = db.Column(db.String(120))
    price = db.Column(db.Numeric(10, 2), default=0)
    image = db.Column(db.String(500))
    description = db.Column(db.Text)
    rating = db.Column(db.Float, default=0)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    bookings = db.relationship("Booking", backref="vendor", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "location": self.location,
            "price": float(self.price) if self.price else 0,
            "image": self.image,
            "description": self.description,
            "rating": self.rating,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }