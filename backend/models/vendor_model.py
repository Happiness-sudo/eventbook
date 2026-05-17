class Vendor:
    def __init__(
        self,
        id,
        name,
        service,
        location,
        price,
        image,
        description,
        rating=5
    ):
        self.id = id
        self.name = name
        self.service = service
        self.location = location
        self.price = price
        self.image = image
        self.description = description
        self.rating = rating

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "service": self.service,
            "location": self.location,
            "price": self.price,
            "image": self.image,
            "description": self.description,
            "rating": self.rating
        }