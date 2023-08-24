from flask import Flask
from faker import Faker
from ..models import db, Users, Products, Orders, Line_Items
from dotenv import load_dotenv
from random import randint
import os

load_dotenv()  # load environment variables from .env if it exists.

user_count = 20
product_count = 20
order_count = 30
line_item_count = 30

"""
Function to seed the database
"""


def seed_database(app: Flask):
    # Initialize Faker Library
    fake = Faker()

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
                email = f'{"_".join(name.split(" ")).lower()}@{fake.domain_name()}'
                password = "testaccount"
                users.append(Users(name, email, password, randint(0, 1)))

            s.bulk_save_objects(users)

            users = s.query(Users).all()

            # Make Products
            products = []
            names = ["Dianne", "Jolly", "Keychell", "Donnalyn", "Brandi", "Shandi", "Kilworth", "Yulissa","Ramzan", "Cicillia"]
            for i in range(product_count):
                name = names[i%len(names)]
                description = "".join(fake.paragraph(nb_sentences=5))
                price = randint(0, 2000)
                image = str(randint(1, 5)) + ".png"
                status = "published"
                user_id = users[randint(0, user_count - 1)].id
                products.append(
                    Products(name, description, price, image, status, user_id)
                )

            s.bulk_save_objects(products)

            products = s.query(Products).all()

            # Orders
            orders = []
            for i in range(order_count):
                user_id = users[randint(0, user_count - 1)].id
                billing_address = fake.address()
                total_amount = 0
                status_list = ["pending", "completed", "canceled"]
                status = status_list[randint(0, 2)]
                orders.append(Orders(user_id, billing_address, total_amount, status))

            s.bulk_save_objects(orders)

            orders = s.query(Orders).all()

            # Line Items
            line_items = []
            for i in range(line_item_count):
                product_id = products[randint(0, product_count - 1)].id
                order_id = orders[randint(0, order_count - 1)].id
                line_items.append(Line_Items(order_id, product_id, randint(1, 10)))

            s.bulk_save_objects(line_items)

            # Save Changes
            s.commit()

            # Turn seeder off for further reloads
            os.environ["SEEDER"] = "OFF"

            print("===!!DATABASE SEEDED WITH FAKE DATA!!===")
