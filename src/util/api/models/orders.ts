import { getCsrfToken, api_url_rest } from '../../constants'

export interface Order {
    user_id: number
    billing_address: string
    total_amount: number
    status: string
}

export async function getOrders() {
    try {
        const jwtToken = localStorage.getItem('jwt')
        const response = await fetch(api_url_rest + `orders/`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })

        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching orders:', error)
        throw error
    }
}

export async function createOrder(orderData: Order) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(orderData),
        })

        const data = await response.json()
        console.log('Created Order:', data)
    } catch (error) {
        console.error('Error creating order:', error)
        throw error
    }
}

export async function updateOrder(orderId: string, updatedOrderData: Order) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(updatedOrderData),
        })

        const updatedOrder = await response.json()
        console.log('Updated Order:', updatedOrder)
    } catch (error) {
        console.error('Error updating order:', error)
        throw error
    }
}

export async function deleteOrder(orderId: string) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
        })

        if (response.status === 204) {
            console.log('Order deleted successfully')
        } else {
            console.log('Failed to delete order')
        }
    } catch (error) {
        console.error('Error deleting order:', error)
        throw error
    }
}

export async function getOrderById(orderId: string) {
    try {
        const response = await fetch(api_url_rest + `orders/${orderId}`)
        const data = await response.json()
        console.log('Order by ID:', data)
        return data
    } catch (error) {
        console.error('Error fetching order:', error)
        throw error
    }
}

// Example order data
export const orderData = {
    user_id: 20,
    billing_address: '123 Main St',
    total_amount: 50.0,
    status: 'Done',
}

// Example updated order data
const updatedOrderData = {
    user_id: 21,
    billing_address: '456 Elm St',
    total_amount: 75.0,
    status: 'Shipped',
}

// Call the functions to interact with the orders API
// getOrders();
// createOrder(orderData);
// updateOrder(1, updatedOrderData);
// deleteOrder(1);
// getOrderById(10);
