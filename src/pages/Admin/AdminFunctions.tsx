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
    'id',
    'user_id',
    'billing_address',
    'total_amount',
    'status',
    'line_items',
]
 
export const test_orders = [
    {
        id: 1,
        user_id: 123,
        billing_address: '123 Main St, City',
        total_amount: 100.5,
        status: 'Pending',
        line_items: [
            { order_id: 1, product_id: 101, qty: 2 },
            { order_id: 1, product_id: 102, qty: 1 },
            // Add more line items for order 1
        ]
    },
    {
        id: 2,
        user_id: 456,
        billing_address: '456 Elm St, Town',
        total_amount: 75.25,
        status: 'Shipped',
        line_items: [
            { order_id: 2, product_id: 201, qty: 3 },
            { order_id: 2, product_id: 202, qty: 1 },
            // Add more line items for order 2
        ]
    },
    {
        id: 3,
        user_id: 789,
        billing_address: '789 Oak St, Village',
        total_amount: 250.0,
        status: 'Delivered',
        line_items: [
            { order_id: 3, product_id: 301, qty: 1 },
            { order_id: 3, product_id: 302, qty: 2 },
            // Add more line items for order 3
        ]
    },
    {
        id: 4,
        user_id: 123,
        billing_address: '321 Pine St, Hamlet',
        total_amount: 50.75,
        status: 'Pending',
        line_items: [
            { order_id: 4, product_id: 401, qty: 1 },
            // Add more line items for order 4
        ]
    },
    {
        id: 5,
        user_id: 456,
        billing_address: '654 Birch St, Countryside',
        total_amount: 150.2,
        status: 'Shipped',
        line_items: [
            { order_id: 5, product_id: 501, qty: 2 },
            { order_id: 5, product_id: 502, qty: 3 },
            // Add more line items for order 5
        ]
    },
]
