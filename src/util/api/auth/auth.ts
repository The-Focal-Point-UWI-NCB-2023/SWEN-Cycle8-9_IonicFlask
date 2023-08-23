import { api_url_auth } from "../../constants"

export async function loginUser(email, password) {
    const csrfToken = await getCsrfToken()
    console.log(csrfToken, "CSRF Token");
    console.log(email, password, "Email and Password");

    try {
        const requestBody = {
            email: email,
            password: password,
        }
        const response = await fetch(
            api_url_auth + `login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(requestBody),
            }
        )
        const data = await response.json()
        console.log('Login:', data)
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('isAuthed', 'true')
        return data
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}

    //     if (response.ok && data.message === 'User found') {
    //         localStorage.setItem('jwt', data.token)
    //         localStorage.setItem('isAuthed', 'true')
    //         return {
    //             success: true,
    //             message: 'Login Successful',
    //         };
    //     } else {
    //         return {
    //             success: false,
    //             message: 'Login Failed',
    //         };
    //     }
    // } catch (error) {
    //     console.error(error);
    //     return {
    //         success: false,
    //         message: 'An error occurred during login',
    //     };
    // }
// }


export async function getCsrfToken() {
    try {
        const tokenResponse = await fetch(
            api_url_auth + `csrf-token`,
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
        
export async function userAdmin() {
    const jwt = localStorage.getItem('jwt');

    const csrfToken = await getCsrfToken()
    try {
        const response = await fetch(api_url_auth + `isAdmin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${jwt}`,
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            //mode: 'no-cors',
        });
        const data = await response.json();

        if (response.ok && data.message == 'true') {
            return true;

        }else if (response.ok && data.message == 'false') {
            return false; 

        } else {
            //console.error('Failed to check admin status');
            return false;
        }
    } catch (error) {
        //console.error('Error during fetch:', error);
        return false;
    }
}
export async function current_User() {
    const jwt = localStorage.getItem('jwt');
    const csrfToken = await getCsrfToken()
    try {
        const response = await fetch(api_url_auth + `CurrentUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${jwt}`,
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
        });
        const data = await response.json()
        if (response.ok) {
            console.log(data.user);
            return data.user;
        } else {
            //console.log(data.message);
            return data;
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return error;
    }
}

export async function isLoggedin() {
    const jwt = localStorage.getItem('jwt');
    const csrfToken = await getCsrfToken()
    try {
        const response = await fetch( api_url_auth + `isLoggedin` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${jwt}`,
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
        });
        const data = await response.json()
        if (response.ok) {
            console.log(data);
            return data.message; 
        } else {
            console.log(data.message);
            return data.message;
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return false;
    }
}

export async function checkLoginStatus() {
    try {
        const loggedInStatus = await isLoggedin();
        console.log(loggedInStatus, "Status");
        if (loggedInStatus === "true") {
            // Redirect the user to the home page
            window.location.href = '/home';
        }
    }catch (error) {
        console.error('Error during fetch:', error);
    }     
}

export function logoutUser() {
    localStorage.setItem('isAuthed', 'false');
    localStorage.removeItem('jwt');
    window.location.href = '/login'; 
}


