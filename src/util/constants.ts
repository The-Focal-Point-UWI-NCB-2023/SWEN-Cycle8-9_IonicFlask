export const api_url = 'http://127.0.0.1:8080/'
export const api_url_rest = 'http://127.0.0.1:8080/api/v1/rest/'
export const api_url_auth = 'http://localhost:8080/api/v1/auth/'

export async function getCsrfToken() {
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
