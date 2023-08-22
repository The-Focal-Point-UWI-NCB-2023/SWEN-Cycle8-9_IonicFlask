import { getCsrfToken, api_url_rest } from '../../constants'

export interface User {
    id: number
    full_name: string
    email: string
    password: number
    role: string
}

export async function getUsers() {
    try {
        const response = await fetch(api_url_rest + `users/`, {
            headers: {
                Authorization: 'Bearer', // Add your bearer token here
            },
        })
        const data = await response.json()
        console.log(data) // Logging the data for debugging purposes
        return data // Return the fetched data
    } catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
}

export async function createUser(userData: User) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(userData),
        })

        const data = await response.json()
        console.log('Created user:', data)
        return data // Return the fetched data
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

export async function updateUser(userId: String, updateduserData: User) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(updateduserData),
        })

        const data = await response.json()
        console.log('Updated user:', data)
        return data // Return the fetched data
    } catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}

export async function deleteUser(userId: String) {
    try {
        const csrfToken = await getCsrfToken()
        const response = await fetch(api_url_rest + `users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            mode: 'cors',
        })

        if (response.status === 204) {
            console.log('User deleted successfully')
        } else {
            console.log('Failed to delete user')
        }
    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}

export async function getUserById(userId: String) {
    try {
        const response = await fetch(api_url_rest + `users/${userId}`)
        const data = await response.json()
        console.log(data) // Logging the data for debugging purposes
        return data // Return the fetched data
    } catch (error) {
        console.error('Error fetching user:', error)
        throw error
    }
}
