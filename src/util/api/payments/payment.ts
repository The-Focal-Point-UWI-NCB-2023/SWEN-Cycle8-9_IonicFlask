import { getCsrfToken, api_url_rest } from '../../constants'

export async function makePayment(cartData) {
    const requestData = {
        success_url: 'https://www.google.com/',
        cancel_url: 'https://www.google.com/',
        name: 'Product Name',
        description: 'Product Description',
        images: ['https://i.imgur.com/4Iac5ON.jpeg'],
        unit_amount_decimal: '1000', // Example unit amount in decimal
        quantity: 1,
    }

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
                body: JSON.stringify(cartData),
            }
        )
        const data = await response.json()
        console.log(cartData)
        return data
    } catch (error) {
        console.error('Error creating payment:', error)
        throw error
    }
}
