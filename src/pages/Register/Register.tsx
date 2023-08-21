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

const Register: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [present] = useIonToast()
    const [csrfToken, setCsrfToken] = useState('')

    async function getCsrfToken() {
        try {
            const response = await fetch(
                'http://localhost:8080/api/v1/auth/csrf-token',
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )
            //console.log(response.status);
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

    const RegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const requestBody = {
                full_name: name,
                email: email,
                password: password,
            }

            const response = await fetch(
                'http://localhost:8080/api/v1/auth/register',
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

            if (response.ok) {
                setSuccess(data.message)
                present({
                    message: 'User Registered Successfully',
                    duration: 3000,
                    color: 'success',
                })
                window.location.href = '/login'
            } else {
                setError(data.message)
                present({
                    message: error,
                    duration: 3000,
                    color: 'danger',
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    //             .then(async (response) => {
    //                 if (response.status === 200) {
    //                     const data = await response.json()
    //                     console.log(data);
    //                     setSuccess(data.message);
    //                     present({
    //                         message: success,
    //                         duration: 3000,
    //                         color: "success"
    //                     })
    //                     window.location.href = '/login';
    //                 } else {
    //                     const data = await response.json()
    //                     console.log(data);
    //                     setError(data.message);
    //                     present({
    //                         message: error,
    //                         duration: 3000,
    //                         color: "danger"
    //                     })
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error(error)
    //             })
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return (
        <Main>
            <h1>Register</h1>
            <form id="register-form" onSubmit={RegisterUser}>
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
                            color="primary"
                            onClick={(e) => {
                                RegisterUser(e)
                            }}
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
