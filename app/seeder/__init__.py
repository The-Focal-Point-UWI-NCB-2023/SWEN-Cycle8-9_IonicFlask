from flask import Flask
from faker import Faker
from ..models import db, Users, Products, Orders, Line_Items
from dotenv import load_dotenv
from random import randint
import os

load_dotenv()  # load environment variables from .env if it exists.

# Initialize Faker Library
fake = Faker()
user_count = 20
product_count = 10
order_count = 10
line_item_count = 10

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
            for i in range(user_count):
                name = fake.name()
                email = f'{name.join("_")}@{fake.domain_name()}'
                password = name + email + str(randint(0, 100) * randint(0, 100))
                users.append(Users(name, email, password, randint(0, 1)))

            s.bulk_save_objects(users)

            # Make Products
            products = []
            for i in range(product_count):
                name = fake.text(max_nb_chars=20)
                description = fake.paragraph(nb_sentences=5).join(" ")
                price = randint(0, 2000)
                image = randint(0, 5)
                status = "published"
                users = s.query(Users).all()
                user_id = users[randint(0, user_count - 1)].id
                products.append(
                    Products(name, description, price, image, status, user_id)
                )

            s.bulk_save_objects(products)

            # Orders
            orders = []
            for i in range(order_count):
                users = s.query(Users).all()
                user_id = users[randint(0, user_count - 1)].id
                billing_address = fake.address()
                total_amount = 0
                status_list = ["pending", "completed", "canceled"]
                status = status_list[randint(0, 2)]
                orders.append(Orders(user_id, billing_address, total_amount, status))

            s.bulk_save_objects(orders)

            s.commit()
            print("===!!DATABASE SEEDED WITH FAKE DATA!!===")
