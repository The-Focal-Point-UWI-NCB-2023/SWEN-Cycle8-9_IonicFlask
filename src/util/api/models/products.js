export async function getProducts() {
    try {
        const response = await fetch(
            'http://127.0.0.1:8080/api/v1/rest/products/',
            {
                headers: {
                    Authorization: 'Bearer', // Add your bearer token here
                },
            }
        )
        const data = await response.json()
        console.log(data) // Logging the data for debugging purposes

        return data // Return the fetched data
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

async function createProduct(productData) {
    try {
        const response = await fetch(
            'http://127.0.0.1:8080/api/v1/rest/products/',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer`,
                    // "X-CSRF-Token": csrfToken,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'same-origin',
                body: JSON.stringify(productData),
            }
        )

        const data = await response.json()
        console.log('Created Product:', data)
    } catch (error) {
        console.error('Error creating product:', error)
        throw error
    }
}

async function updateProduct(productId, updatedProductData) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8080/api/v1/rest/products/${productId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer`,
                    // "X-CSRF-Token": csrfToken, // If you want to include CSRF token
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            }
        )

        const updatedProduct = await response.json()
        console.log('Updated Product:', updatedProduct)
    } catch (error) {
        console.error('Error updating product:', error)
        throw error
    }
}

const productData = {
    name: 'New Product',
    description: 'A new product',
    price: 19.99,
    image: 'image.jpg',
    status: 'TEST',
    user_id: 20,
}

const updatedProductData = {
    name: 'Updated Product Name',
    description: 'Updated product description',
    price: 29.99,
    image: 'updated-image.jpg',
    status: 'Updated status',
    user_id: 20,
}

async function deleteProduct(productId) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(
            `http://127.0.0.1:8080/api/v1/rest/products/${productId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer`,
                    // "X-CSRF-Token": csrfToken,
                },
            }
        )

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

export async function getProductById(productId) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8080/api/v1/rest/products/${productId}`
        )
        const data = await response.json()
        console.log(data) // Logging the data for debugging purposes

        return data // Return the fetched data
    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }
}

async function getCsrfToken() {
    try {
        const tokenResponse = await fetch(
            'http://127.0.0.1:8080/api/v1/auth/csrf-token',
            {
                credentials: 'include',
            }
        )
        const tokenData = await tokenResponse.json()
        const csrfToken = tokenData.csrf_token
        return csrfToken
    } catch (error) {
        console.error('Error fetching CSRF token:', error)
        throw error
    }
}

// getProductById(13)
// deleteProduct(13)
// updateProduct(12, productData);
// createProduct(productData)
// getProducts()

// getCsrfToken()

// getCsrfToken()
//   .then(csrfToken => {
//     console.log('CSRF Token:', csrfToken);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
