def build_vendor(data, vendor_id):
    return {
        "id": vendor_id,
        "name": data.get("name"),
        "service": data.get("service"),
        "price": data.get("price"),
        "location": data.get("location"),
        "image": data.get("image"),
        "description": data.get("description"),
    }
