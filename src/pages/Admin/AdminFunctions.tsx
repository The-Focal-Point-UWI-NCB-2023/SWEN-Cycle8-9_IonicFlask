export const userHeaders: string[] = ['full_name', 'email', 'role', 'Actions']

export const test_users = [
    {
        Name: 'Admin User',
        Email: 'admin@example.com',
        Password: 'admin123',
        Role: 'admin',
    },
    {
        Name: 'Regular User 1',
        Email: 'user1@example.com',
        Password: 'user123',
        Role: 'regular',
    },
    {
        Name: 'Regular User 2',
        Email: 'user2@example.com',
        Password: 'user456',
        Role: 'regular',
    },
    {
        Name: 'Admin User 2',
        Email: 'admin2@example.com',
        Password: 'admin456',
        Role: 'admin',
    },
    {
        Name: 'Regular User 3',
        Email: 'user3@example.com',
        Password: 'user789',
        Role: 'regular',
    },
]

export const prodHeaders = ['image', 'name', 'description', 'price', 'Actions']
export const products = [
    {
        id: 0,
        Title: 'Cowrie Shield Earring',
        Image: 'earring1.jpeg',
        Description:
            'A Kenyan inspired handmade beaded earring. It can also be worn as a ring or bracelet.',
        Price: 2000,
    },
    {
        id: 1,
        Title: 'Double Beaded Rings',
        Image: 'earring4.jpeg',
        Description: 'Handmade double hooped beaded earring.',
        Price: 1500,
    },
    {
        id: 2,
        Title: 'Drop Cowrie Earrings',
        Image: 'earring3.jpeg',
        Description: 'Drop earrings made with cowrie shells and glass beads',
        Price: 2000,
    },
    {
        id: 3,
        Title: 'Gem stone Bracelets',
        Image: 'bracelet.jpeg',
        Description: 'Bracelet set of 2, made from aventurine gem stones',
        Price: 2500,
    },
    {
        id: 4,
        Title: 'Embroidered Spideys',
        Image: 'embroid_tshirt.jpg',
        Description:
            'Machine embroidered sweatshirt, stitched is a scene from Spiderman and a viral meme',
        Price: 5000,
    },
    {
        id: 5,
        Title: 'Crocheted shroom',
        Image: 'bag.jpg',
        Description: 'Crocheted mushroom shoulder bag',
        Price: 4500,
    },
]

export const order_headers = [
    'id',
    'user_id',
    'billing_address',
    'total_amount',
    'status',
    'line_items',
]

export const orders = [
    {
        OrderID: 1,
        UserID: 123,
        BillingAddress: '123 Main St, City',
        TotalAmount: 100.5,
        Status: 'Pending',
    },
    {
        OrderID: 2,
        UserID: 456,
        BillingAddress: '456 Elm St, Town',
        TotalAmount: 75.25,
        Status: 'Shipped',
    },
    {
        OrderID: 3,
        UserID: 789,
        BillingAddress: '789 Oak St, Village',
        TotalAmount: 250.0,
        Status: 'Delivered',
    },
    {
        OrderID: 4,
        UserID: 123,
        BillingAddress: '321 Pine St, Hamlet',
        TotalAmount: 50.75,
        Status: 'Pending',
    },
    {
        OrderID: 5,
        UserID: 456,
        BillingAddress: '654 Birch St, Countryside',
        TotalAmount: 150.2,
        Status: 'Shipped',
    },
]
