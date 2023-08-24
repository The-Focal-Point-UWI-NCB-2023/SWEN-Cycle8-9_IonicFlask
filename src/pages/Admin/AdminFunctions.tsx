export const userHeaders: string[] = ['full_name', 'email', 'role', 'Actions']
export const test_users = [
    {
        id: 1,
        full_name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
    },
    {
        id: 2,
        full_name: 'Regular User 1',
        email: 'user1@example.com',
        role: 'regular',
    },
    {
        id: 3,
        full_name: 'Regular User 2',
        email: 'user2@example.com',
        role: 'regular',
    },
    {
        id: 4,
        full_name: 'Admin User 2',
        email: 'admin2@example.com',
        role: 'admin',
    },
    {
        id: 5,
        full_name: 'Regular User 3',
        email: 'user3@example.com',
        role: 'regular',
    },
]

export const prodHeaders = [
    'image',
    'full_name',
    'description',
    'price',
    'Actions',
]

import { Product } from '../../util/api/models/products'

export const products: Product[] = [
    {
        id: 0,
        name: 'Cowrie Shield Earring',
        image: 'earring1.jpeg',
        description:
            'A Kenyan inspired handmade beaded earring. It can also be worn as a ring or bracelet.',
        price: 2000,
        status: 'Available',
        user_id: 123, // Replace with actual user ID
    },
    {
        id: 1,
        name: 'Double Beaded Rings',
        image: 'earring4.jpeg',
        description: 'Handmade double hooped beaded earring.',
        price: 1500,
        status: 'Available',
        user_id: 123, // Replace with actual user ID
    },
    {
        id: 2,
        name: 'Drop Cowrie Earrings',
        image: 'earring3.jpeg',
        description: 'Drop earrings made with cowrie shells and glass beads.',
        price: 2000,
        status: 'Available',
        user_id: 123, // Replace with actual user ID
    },
    {
        id: 3,
        name: 'Gem stone Bracelets',
        image: 'bracelet.jpeg',
        description: 'Bracelet set of 2, made from aventurine gem stones.',
        price: 2500,
        status: 'Available',
        user_id: 123, // Replace with actual user ID
    },
    {
        id: 4,
        name: 'Embroidered Spideys',
        image: 'embroid_tshirt.jpg',
        description:
            'Machine embroidered sweatshirt, stitched with a scene from Spiderman and a viral meme.',
        price: 5000,
        status: 'Available',
        user_id: 123, // Replace with actual user ID
    },
    {
        id: 5,
        name: 'Crocheted shroom',
        image: 'bag.jpg',
        description: 'Crocheted mushroom shoulder bag.',
        price: 4500,
        status: 'Available',
        user_id: 123, // Replace with actual user ID
    },
]

import { LineItem } from '../../util/api/models/line_items'
export const order_headers = [
    'order_id',
    'billing_address',
    'total_amount',
    'status',
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
