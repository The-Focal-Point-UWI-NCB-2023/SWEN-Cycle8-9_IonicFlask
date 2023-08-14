from flask import Flask
from ..models import db, Users, Products, Orders, Line_Items
from dotenv import load_dotenv
import os

load_dotenv()  # load environment variables from .env if it exists.


def seed_database(app: Flask):
    with app.app_context():
        if os.environ.get("ENVIRONMENT") == "development":
            s = db.session

            # Clear Database
            s.query(Line_Items).delete()
            s.query(Orders).delete()
            s.query(Products).delete()
            s.query(Users).delete()
            s.commit()

            # Start Seeding
            # Make Users
            for i in range(100):
                s.add(Users("test_name", "email", "password", 0))

            s.commit()
