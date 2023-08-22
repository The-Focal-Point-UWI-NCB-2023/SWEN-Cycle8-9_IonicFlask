
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

export async function logout(csrfToken: string) {
    try {
        //const csrfToken = await getCsrfToken()
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

export function isAuthenticated() {
    return localStorage.getItem('isAuthed') === 'true';
}

// export async function isAdmin(){
//     const jwt = localStorage.getItem('jwt');
//     const requestbody = {
//         jwt: jwt
//     }
//     try {
//     const response = await fetch('http://127.0.0.1:8080/api/v1/auth/isAdmin', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${jwt}`,
//             //'X-CSRFToken': csrfToken, 
//         },
//         credentials: 'include',
//         mode: 'no-cors',
//         //body: JSON.stringify(requestbody),

//     });

//     const data = await response.json()

//     if (response.ok ) {
//         //const data = await response.json();
//         return data.message; 
//     } else {
//         console.error('Failed to check admin status');
//         return false;
//     }
//     } catch (error) {
//         console.error('Error during fetch:', error);
//         return false;
//     }
// }
        
export async function isAdmin() {
    const jwt = localStorage.getItem('jwt');

    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/auth/isAdmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            credentials: 'include',
            mode: 'no-cors',
        });

        if (response.ok) {
            const data = await response.text(); // Use response.text() for no-cors mode
            return data; 
        } else {
            console.error('Failed to check admin status');
            return false;
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return false;
    }
}

export async function test() {
    const jwt = localStorage.getItem('jwt');
    try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/auth/isLoggedin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${jwt}`,
            },
            credentials: 'include',
            //mode: 'no-cors',
        });
        const data = await response.json()
        if (response.ok) {
            //const data = await response.text(); // Use response.text() for no-cors mode
            console.log(data);
            return data; 
        } else {
            console.log(data.message);

            
            return data;
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return false;
    }
}


export function logoutUser() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isAuthed');
    // You can also perform additional cleanup if necessary
    window.location.href = '/login'; // Redirect to the login page after logout
}


