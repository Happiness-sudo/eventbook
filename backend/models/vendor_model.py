from datetime import datetime
from extensions import db, ma


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
    services = db.Column(db.JSON, default=list)

    user_id = db.Column(db.Integer, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self):
        return f"<Vendor {self.name}>"


class VendorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Vendor
        load_instance = True
        include_fk = True


vendor_schema = VendorSchema()
vendors_schema = VendorSchema(many=True)