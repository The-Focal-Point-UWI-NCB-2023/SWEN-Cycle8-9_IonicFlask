import { getCsrfToken, api_url_rest } from '../../constants'

export async function makePayment() {
    const payload = {
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Book1',
                        description: 'A Book',
                        images: 'https://i.imgur.com/EHyR2nP.png',
                    },
                    unit_amount_decimal: '5899',
                },
                quantity: 1,
            },
        ],
        success_url: 'https://www.google.com/',
        cancel_url: 'https://www.google.com/',
    }

    const requestData = {
        success_url: 'https://www.google.com/',
        cancel_url: 'https://www.google.com/',
        name: 'Product Name',
        description: 'Product Description',
        images: ['https://i.imgur.com/4Iac5ON.jpeg'],
        unit_amount_decimal: '1000', // Example unit amount in decimal
        quantity: 1,
    }

    const test = JSON.stringify(requestData)
    const test_body = JSON.stringify(payload)
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(
            api_url_rest + `payment/create-checkout-session`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                mode: 'cors',
                body: test,
            }
        )
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating payment:', error)
        throw error
    }
}
