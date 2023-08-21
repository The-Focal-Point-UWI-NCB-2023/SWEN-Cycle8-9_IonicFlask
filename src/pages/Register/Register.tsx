import { useIonToast } from '@ionic/react'
import { useState } from 'react'
import Main from '../../components/Main/Main'
import styles from './Register.module.scss'

const Register: React.FC = () => {
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [present] = useIonToast();

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
        </Main>
    )
}

export default Register
