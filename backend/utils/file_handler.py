import json
import os

def read_data(filename):
    path = os.path.join("data", filename)

    if not os.path.exists(path):
        return []

    with open(path, "r") as file:
        try:
            return json.load(file)
        except:
            return []

def write_data(filename, data):
    path = os.path.join("data", filename)

    with open(path, "w") as file:
        json.dump(data, file, indent=4)