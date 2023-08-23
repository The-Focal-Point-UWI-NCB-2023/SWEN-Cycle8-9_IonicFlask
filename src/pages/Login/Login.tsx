import React, { useState, useEffect } from 'react'
import {
    IonButton,
    IonInput,
    IonItem,
    IonList,
    useIonToast,
} from '@ionic/react'
import { 
    userAdmin,
    isLoggedin,
    getCsrfToken,
    checkLoginStatus,
    current_User 
} from '../../util/api/auth/auth';
import Main from '../../components/Main/Main'
import styles from './Login.module.scss'
import { api_url_auth } from '../../util/constants';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [present] = useIonToast()
    const [csrfToken, setCsrfToken] = useState('')
    const [jwt, setJwt] = useState('')

    async function getCsrfToken() {
        try {
            const response = await fetch(
                api_url_auth + `csrf-token`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )

            if (response.status === 200) {
                const data = await response.json()
                setCsrfToken(data.csrf_token)
            } else {
                throw new Error('Failed to fetch CSRF token')
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCsrfToken()
        userAdmin()
        current_User()
        checkLoginStatus()
    }, [])

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //console.log(csrfToken, 'csrfToken')
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

            if (response.ok && data.message === 'User found') {
                setJwt(data.token)
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('isAuthed', 'true')
                present({
                    message: 'Login Successful',
                    duration: 3000,
                    color: 'success',
                })
                window.location.href = '/home'
            } else {
                setError('Login Failed')
                present({
                    message: 'Login Failed',
                    duration: 3000,
                    color: 'danger',
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Main>
            <h2>Login Page</h2>
            <form id="login-form" onSubmit={loginUser} method="post">
                <IonList>
                    <IonItem>
                        <IonInput
                            type="text"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)}
                            placeholder="eg. test@gmail.com"
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            placeholder="Enter your password"
                            required
                        />
                    </IonItem>
                    <IonButton type="submit" color="primary">
                        Login
                    </IonButton>
                </IonList>
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </Main>
    )
}

export default Login