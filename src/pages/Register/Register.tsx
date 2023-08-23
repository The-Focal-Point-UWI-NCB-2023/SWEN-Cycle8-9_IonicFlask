import {
    IonButton,
    IonInput,
    IonItem,
    IonList,
    useIonToast,
} from '@ionic/react'
import { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import styles from './Register.module.scss'
import { Redirect } from 'react-router'
import { api_url_auth } from '../../util/constants'
import { checkLoginStatus, registerUser, getCsrfToken } from '../../util/api/auth/auth'


const Register: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [present] = useIonToast()
    const [csrfToken, setCsrfToken] = useState('')


    useEffect(() => {
        getCsrfToken()
        checkLoginStatus()
    }, [])

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const registerResponse = await registerUser(name, email, password)
        //console.log("Register Resp", registerResponse.status, registerResponse.message)
        //console.log("Register Resp", registerResponse.full_name, registerResponse.email, registerResponse.password)
        if ( registerResponse.email != null) {
            present({
                message: 'User Registered Successfully',
                duration: 3000,
                color: 'success',
            })
            //console.log("Yes I", registerResponse.user)
            window.location.href = '/login'
        } else {
            setError('Registration Failed')
            present({
                message: 'Registration Failed',
                duration: 3000,
                color: 'danger',
            })
        }
    }

    return (
        <Main>
            <h1>Register</h1>
            <form id="register-form" onSubmit={handleRegister}>
                <div className={styles.formGroup}>
                    <IonList>
                        <IonItem>
                            <IonInput
                                type="text"
                                placeholder="Name"
                                value={name}
                                onIonChange={(e) => setName(e.detail.value!)}
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                type="email"
                                placeholder="Email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                type="password"
                                placeholder="Password"
                                value={password}
                                onIonChange={(e) =>
                                    setPassword(e.detail.value!)
                                }
                                required
                            />
                        </IonItem>
                        {/* <IonItem>
                        <IonInput name="password_confirmation" type="password" placeholder="Confirm Password" required />
                    </IonItem> */}
                        <IonButton
                            type="submit"
                            color="primary"
                        >
                            Register
                        </IonButton>
                    </IonList>
                </div>
                <p className={styles.register}>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </Main>
    )
}

export default Register
