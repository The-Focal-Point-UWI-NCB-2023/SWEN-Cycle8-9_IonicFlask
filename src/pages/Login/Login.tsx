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
    current_User,
    loginUser,
} from '../../util/api/auth/auth'
import Main from '../../components/Main/Main'
import styles from './Login.module.scss'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [present] = useIonToast()
    const [csrfToken, setCsrfToken] = useState('')
    const [jwt, setJwt] = useState('')

    useEffect(() => {
        getCsrfToken()
        userAdmin()
        current_User()
        checkLoginStatus()
    }, [])

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('reached')
        e.preventDefault()
        const loginResponse = await loginUser(email, password)
        console.log('Login Resp', loginResponse.status, loginResponse.message)
        if (loginResponse.message === 'User found') {
            present({
                message: 'Login Successful',
                duration: 3000,
                color: 'success',
            })
            window.location.href = '/home'
        } else {
            setError('Email or Password is incorrect')
            present({
                message: 'Email or Password is incorrect',
                duration: 3000,
                color: 'danger',
            })
        }
    }

    return (
        <Main>
            <h2>Login Page</h2>
            <div className={styles.container}>
                <form id="login-form" onSubmit={handleLogin} method="post">
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
