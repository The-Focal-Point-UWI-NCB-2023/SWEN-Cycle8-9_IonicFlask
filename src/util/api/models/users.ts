import { getCsrfToken, api_url_rest } from "../../constants"

export async function getUsers() {
    try {
        const response = await fetch(
            api_url_rest+`users/`,
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
        console.error('Error fetching users:', error)
        throw error
    }
}

