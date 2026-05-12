import json
import os

USERS_FILE = os.path.join(os.path.dirname(__file__), '../data/users.json')

class User:
    @staticmethod
    def _load_data():
        if not os.path.exists(USERS_FILE):
            return []
        with open(USERS_FILE, 'r') as f:
            return json.load(f)

    @staticmethod
    def find_by_id(user_id):
        users = User._load_data()
        for u in users:
            if u.get('id') == user_id:
                return u
        return None
