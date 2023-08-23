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
                        images: 'https://i.imgur.com/EHyR2nP.png'
                    },
                    unit_amount_decimal: '5899'
                },
                quantity: 1
            }
        ],
        success_url: 'https://www.google.com/',
        cancel_url: 'https://www.google.com/'
    };

    const test_body = JSON.stringify(payload);
    try{
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `payment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: test_body
            
        })
    }catch(error){
        console.error('Error creating payment:', error)
        throw error
    }


}