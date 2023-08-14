from flask import Flask
from faker import Faker
from ..models import db, Users, Products, Orders, Line_Items
from dotenv import load_dotenv
from random import randint
import os

load_dotenv()  # load environment variables from .env if it exists.

# Initialize Faker Library
fake = Faker()

"""
Function to seed the database
"""


def seed_database(app: Flask):
    with app.app_context():
        if (
            os.environ.get("ENVIRONMENT") == "development"
            and os.environ.get("SEEDER") == "ON"
        ):
            print("===DATABASE SEEDING IN PROGRESS...===")
            s = db.session

            # Clear Database
            s.query(Line_Items).delete()
            s.query(Orders).delete()
            s.query(Products).delete()
            s.query(Users).delete()

            # Start Seeding
            # Make Users
            users = []
            for i in range(20):
                name = fake.name()
                email = f'{name.join("_")}@{fake.domain_name()}'
                password = name + email + str(randint(0, 100) * randint(0, 100))
                users.append(Users(name, email, password, randint(0, 1)))

            s.bulk_save_objects(users)

            s.commit()
            print("===!!DATABASE SEEDED WITH FAKE DATA!!===")
