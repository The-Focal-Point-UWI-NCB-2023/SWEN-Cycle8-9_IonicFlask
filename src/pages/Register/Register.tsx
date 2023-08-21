import { IonButton, IonInput, IonItem, IonList, useIonToast } from '@ionic/react'
import { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import styles from './Register.module.scss'
import { use } from 'chai'

const Register: React.FC = () => {

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [present] = useIonToast();
    const [csrfToken, setCsrfToken] = useState('');

    async function getCsrfToken() {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/csrf-token', {
                method: 'GET',
                credentials: 'include'
            })
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
        getCsrfToken();
    }, []);

    useEffect(() => {
        console.log("CSRF Token: ", csrfToken);
    }, []); // This effect will run whenever csrfToken changes


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('submitting');
        try {
            const form = document.querySelector('#register-form') as HTMLFormElement;
            const formData = new FormData(form);
            console.log(formData);
            fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        const data = await response.json()
                        console.log(data);
                        setSuccess(data.message);
                        present({
                            message: success,
                            duration: 3000,
                            color: "success"
                        })
                    } else {
                        const data = await response.json()
                        console.log(data);
                        setError(data.message);
                        present({
                            message: error,
                            duration: 3000,
                            color: "danger"
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <Main>
            <h1>Register</h1>
            <form id="register-form" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                <IonList>
                    <IonItem>
                        <IonInput name="name" type="text" placeholder="Name" required />
                    </IonItem>
                    <IonItem>
                        <IonInput name="email" type="email" placeholder="Email" required />
                    </IonItem>
                    <IonItem>
                        <IonInput name="password" type="password" placeholder="Password" required />
                    </IonItem>
                    <IonItem>
                        <IonInput name="password_confirmation" type="password" placeholder="Confirm Password" required />
                    </IonItem>
                    <IonButton color="primary" onClick={(e) => { handleSubmit(e) }}>Register</IonButton>
                </IonList>

                </div>
                <p className={styles.register}>Already have an account? <a href='/login'>Login</a></p>
            </form>
                    
        </Main>
    )
}

export default Register
