import { getCsrfToken, api_url_rest } from '../../constants'
import { LineItem, parseLineItemComponent } from './line_items'
import { getLineItemById } from './line_items'

export interface Order {
    id:number
    user_id: number
    billing_address: string
    total_amount: number
    status: string
}

export interface OrderWithLineItems {
    orderData: Order;
    lineItems: LineItem;
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
        //console.log(getOrdersWithLineItems(data))
        //getLineItemById(data[0].id)
        return data
    } catch (error) {
        console.error('Error fetching orders:', error)
        throw error
    }
}



export async function getOrdersWithLineItems(data: Order[]){
    try {
        
        const ordersWithLineItems = [];
        
        for (let x = 0; x < data.length; x++) {
            const lineItems = await getLineItemById(data[x].id.toString()); 

            ordersWithLineItems.push({
                orderData: data[x],
                lineItems: lineItems,
            });
        }
        console.log(ordersWithLineItems)
        return ordersWithLineItems;
    } catch (error) {
        console.error('Error fetching orders with line items:', error);
        throw error;
    }
}







export async function createOrder(orderData: Order) {
    try {
        const jwtToken = localStorage.getItem('jwt')
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                Authorization: `Bearer ${jwtToken}`,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(orderData),
        })

        const data = await response.json()
        console.log('Created Order:', data)
        return data
    } catch (error) {
        console.error('Error creating order:', error)
        throw error
    }
}

export async function updateOrder(orderId: string, updatedOrderData: Order) {
    try {
        const jwtToken = localStorage.getItem('jwt')
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                Authorization: `Bearer ${jwtToken}`,
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
        const jwtToken = localStorage.getItem('jwt')
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                Authorization: `Bearer ${jwtToken}`,
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
        const jwtToken = localStorage.getItem('jwt')
        const response = await fetch(api_url_rest + `orders/${orderId}`)
        const data = await response.json()
        // console.log('Order by ID:', data)
        return data
    } catch (error) {
        console.error('Error fetching order:', error)
        throw error
    }
}

export async function getOrderByUserID(userID: string) {
    try {
        const jwtToken = localStorage.getItem('jwt')
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `orders/user/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                Authorization: `Bearer ${jwtToken}`,
            },
            credentials: 'include',
            mode: 'cors',
        })
        const data = await response.json()
        // console.log('Order by UserID:', data)
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
