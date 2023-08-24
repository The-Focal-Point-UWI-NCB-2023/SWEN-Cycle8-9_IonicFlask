import { getCsrfToken, api_url_rest } from '../../constants'

export interface LineItem {
    order_id: number
    product_id: number
    qty: number
}

export async function getLineItems() {
    try {
        const response = await fetch(api_url_rest + `line_items/`, {
            headers: {
                Authorization: 'Bearer', // Add your bearer token here
            },
        })

        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching line items:', error)
        throw error
    }
}

export async function createLineItem(lineItemData: LineItem) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `line_items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(lineItemData),
        })

        const data = await response.json()
        console.log('Created Line Item:', data)
    } catch (error) {
        console.error('Error creating line item:', error)
        throw error
    }
}

export async function updateLineItem(
    lineItemId: string,
    updatedLineItemData: LineItem
) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(
            api_url_rest + `line_items/${lineItemId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(updatedLineItemData),
            }
        )

        const updatedLineItem = await response.json()
        console.log('Updated Line Item:', updatedLineItem)
    } catch (error) {
        console.error('Error updating line item:', error)
        throw error
    }
}

export async function deleteLineItem(lineItemId: string) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(
            api_url_rest + `line_items/${lineItemId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                mode: 'cors',
            }
        )

        if (response.status === 204) {
            console.log('Line item deleted successfully')
        } else {
            console.log('Failed to delete line item')
        }
    } catch (error) {
        console.error('Error deleting line item:', error)
        throw error
    }
}

export async function getLineItemById(lineItemId: string) {
    try {
        const response = await fetch(api_url_rest + `line_items/${lineItemId}`)
        const data = await response.json()
        console.log('Line Item by ID:', data)
        return data
    } catch (error) {
        console.error('Error fetching line item:', error)
        throw error
    }
}

// Example line item data
const lineItemData = {
    order_id: 9,
    product_id: 26,
    qty: 31,
}

// Example updated line item data
const updatedLineItemData = {
    order_id: 17,
    product_id: 23,
    qty: 42,
}

export function parseLineItemComponent(input: string): LineItem[] | null {
    // Remove brackets and split into parts
    const parts = input.replace(/\[|\]/g, '').split(' ');

    // Ensure the correct format
    if (parts.length !== 3 || parts[0] !== '<Item(s)' || parts[2] !== '>') {
        return null;
    }

    // Parse the quantity
    const quantity = parseInt(parts[1]);

    if (isNaN(quantity)) {
        return null;
    }

    // Create and return the list of LineItem
    const lineItems: LineItem[] = [];

    for (let i = 0; i < quantity; i++) {
        const lineItem: LineItem = {
            order_id: i + 1,  // Assuming the order IDs start from 1
            product_id: i + 1,  // Assuming the product IDs start from 1
            qty: 1,  // Assuming each line item quantity is 1
        };
        lineItems.push(lineItem);
    }

    return lineItems;
}

// Call the functions to interact with line items
// getLineItems();
// createLineItem(lineItemData);
// updateLineItem("32", updatedLineItemData);
// deleteLineItem("32");
