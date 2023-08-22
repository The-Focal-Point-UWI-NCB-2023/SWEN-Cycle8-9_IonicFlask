import { getCsrfToken, api_url_rest } from '../../constants'

export interface Product {
    name: string
    description: string
    price: number
    image: string
    status: string
    user_id: number
}

export async function getProducts() {
    try {
        const response = await fetch(api_url_rest + `/products/`, {
            headers: {
                Authorization: 'Bearer', // Add your bearer token here
            },
        })
        const data = await response.json()
        console.log(data) // Logging the data for debugging purposes
        return data // Return the fetched data
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

export async function createProduct(productData: Product) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(productData),
        })

        const data = await response.json()
        console.log('Created Product:', data)
        return data // Return the fetched data
    } catch (error) {
        console.error('Error creating product:', error)
        throw error
    }
}

export async function updateProduct(
    productId: String,
    updatedProductData: Product
) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(updatedProductData),
        })

        const data = await response.json()
        console.log('Updated Product:', data)
        return data // Return the fetched data
    } catch (error) {
        console.error('Error updating product:', error)
        throw error
    }
}

export async function deleteProduct(productId: String) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
        })

        if (response.status === 204) {
            console.log('Product deleted successfully')
        } else {
            console.log('Failed to delete product')
        }
    } catch (error) {
        console.error('Error deleting product:', error)
        throw error
    }
}

export async function getProductById(productId: String) {
    try {
        const response = await fetch(api_url_rest + `products/${productId}`)
        const data = await response.json()
        console.log(data) // Logging the data for debugging purposes
        return data // Return the fetched data
    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }
}

// getProductById(13)
// deleteProduct(13)
// updateProduct(12, productData);
// createProduct(productData)
// getProducts()
// getCsrfToken()
