import json
import os

VENDORS_FILE = os.path.join(os.path.dirname(__file__), '../data/vendors.json')

class Vendor:
    @staticmethod
    def _load_data():
        if not os.path.exists(VENDORS_FILE):
            return []
        with open(VENDORS_FILE, 'r') as f:
            return json.load(f)

    @staticmethod
    def find_by_id(vendor_id):
        vendors = Vendor._load_data()
        for v in vendors:
            if v.get('id') == vendor_id:
                return v
        return None

    @staticmethod
    def find_by_user_id(user_id):
        vendors = Vendor._load_data()
        for v in vendors:
            if v.get('user_id') == user_id:
                return v
        return None
