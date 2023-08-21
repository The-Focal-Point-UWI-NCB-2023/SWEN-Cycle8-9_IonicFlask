import { IonButton, IonInput, IonItem, IonList, useIonToast } from '@ionic/react'
import { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import styles from './Login.module.scss'


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
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
        console.log("CSRF Token:",csrfToken);
    }, [csrfToken]); // This effect will run whenever csrfToken changes


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //console.log('submitting');
        
        try {
            //console.log( "csrfToken 2:",csrfToken);
            const form = document.querySelector('#login-form') as HTMLFormElement;
            const formData = new FormData(form);
            //console.log(formData);
    
            fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if (data.message === 'User found') {
                    setSuccess('Login Successful');
                    present({
                        message: success,
                        duration: 3000,
                        color: 'success'
                    });
                    window.location.href = '/home';
                } else {
                    setError('Login Failed');
                    present({
                        message: error,
                        duration: 3000,
                        color: 'danger'
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Main>
            <h2>Login</h2>
            <form id='login-form' onSubmit={handleSubmit} method='post'> 
            <input type="hidden" name="csrf_token" value="{{ csrftoken() }}"/>
            <IonList>
                
                <IonItem>
                    <IonInput label= 'Email' name='email' placeholder='eg. test@gmail.com' required/>
                </IonItem>
                <IonItem>
                    <IonInput label= 'Password' name='password' placeholder='Enter your password' required/>
                </IonItem>
                <IonButton color='primary' onClick = {(e) => {handleSubmit(e)}}>Login</IonButton>


            </IonList>
            <p className={styles.register}>Don't have an account? <a href='/register'>Register</a></p>
            </form>
        </Main>
    )
}
export default Login
