
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

export async function logout() {
    try {
        const csrfToken = await getCsrfToken()
        const logoutResponse = await fetch(
            'http://127.0.0.1:8080/api/v1/auth/logout',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            }
        )
        const logoutData = await logoutResponse.json()
        return logoutData
    } catch (error) {
        console.error('Error logging out:', error)
        throw error
    }
} 

