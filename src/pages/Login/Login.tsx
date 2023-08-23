import React, { useState, useEffect } from 'react'
import {
    IonButton,
    IonInput,
    IonItem,
    IonList,
    useIonToast,
} from '@ionic/react'
import Main from '../../components/Main/Main'
import styles from './Login.module.scss'

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
                'http://localhost:8080/api/v1/auth/csrf-token',
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
    }, [])

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const requestBody = {
                email: email,
                password: password,
            }
            const response = await fetch(
                'http://localhost:8080/api/v1/auth/login',
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
            <div className={styles.container}>
                <form id="login-form" onSubmit={loginUser} method="post">
                    <div className={styles.formGroup}>
                        <p>Welcome back!</p>
                        <IonList>
                            <br />
                            <IonInput
                                label="Email"
                                label-placement="floating"
                                helperText="Enter a valid email"
                                fill="outline"
                                type="email"
                                inputmode="email"
                                pattern="email"
                                placeholder="Email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                required
                            />
                            {/* </IonItem>
                    <IonItem> */}
                            <br />
                            <IonInput
                                label="Password"
                                label-placement="floating"
                                helperText="Type a strong password"
                                fill="outline"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onIonChange={(e) =>
                                    setPassword(e.detail.value!)
                                }
                                required
                            />
                            <IonButton type="submit" color="primary">
                                Login
                            </IonButton>
                            <div>
                                <p className={styles.register}>
                                    Don't have an account?{' '}
                                    <a href="/register">Register</a>{' '}
                                </p>
                            </div>
                        </IonList>
                    </div>
                </form>
            </div>
        </Main>
    )
}

export default Login
