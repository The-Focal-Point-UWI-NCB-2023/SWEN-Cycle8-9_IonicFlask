test_orders = [
    [1, 123, "123 Main St, City", 100.50, "Pending"],
    [2, 456, "456 Elm St, Town", 75.25, "Shipped"],
    [3, 789, "789 Oak St, Village", 250.00, "Delivered"],
    [4, 123, "321 Pine St, Hamlet", 50.75, "Pending"],
    [5, 456, "654 Birch St, Countryside", 150.20, "Shipped"]
]

test_products = [
    Product("Product 1", "Description 1", 50.99, "image1.jpg", "Available", 123),
    Product("Product 2", "Description 2", 25.50, "image2.jpg", "Out of stock", 456),
    Product("Product 3", "Description 3", 150.00, "image3.jpg", "Available", 789),
    Product("Product 4", "Description 4", 75.25, "image4.jpg", "Out of stock", 123),
    Product("Product 5", "Description 5", 200.75, "image5.jpg", "Available", 456)
]

test_users = [
    User("Admin User", "admin@example.com", "admin123", "admin"),
    User("Regular User 1", "user1@example.com", "user123", "regular"),
    User("Regular User 2", "user2@example.com", "user456", "regular"),
    User("Admin User 2", "admin2@example.com", "admin456", "admin"),
    User("Regular User 3", "user3@example.com", "user789", "regular")
]

order_headers = ["Order ID", "User ID", "Billing Address", "Total Amount", "Status"]
product_headers = ["Product Name", "Description", "Price", "Image", "Status", "User ID"]
user_headers = ["Full Name", "Email", "Password", "Role"]
