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
            setError('Login Failed')
            present({
                message: 'Login Failed',
                duration: 3000,
                color: 'danger',
            })
        }
    }

    return (
        <Main>
            <h2>Login Page</h2>
            <form id="login-form" onSubmit={handleLogin} method="post">
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
