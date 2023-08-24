import React, { useState } from 'react'
import {
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonTitle,
} from '@ionic/react'
import { api_url_rest, getCsrfToken } from '../../util/constants'
import styles from './Modals.module.scss'

const UserForm = ({ initialValues, onSubmit }) => {
    const [userName, setUserName] = useState(initialValues.name)
    const [userEmail, setUserEmail] = useState(initialValues.email)
    const [userRole, setUserRole] = useState(initialValues.role)
    const [userID, setUserId] = useState(initialValues.id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const jwt = localStorage.getItem('jwt')
            const csrfToken = await getCsrfToken()
            const formData = new FormData()
            formData.append('full_name', userName)
            formData.append('email', userEmail)
            formData.append('role', userRole)

            const response = await fetch(api_url_rest + `users/${userID}`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': csrfToken,
                    Authorization: `bearer ${jwt}`,
                },
                credentials: 'include',
                mode: 'cors',
                body: formData,
            })

            const data = await response.json()
            console.log('Updated user successfully')
            onSubmit()
        } catch (error) {
            // Handle success
            console.error('Error creating user:', error)
            // Handle error
        }
    }

    return (
        <div className={styles.container}>
            <form
                id="form"
                action="#"
                method="post"
                encType="multipart/form-data"
            >
                <IonTitle>Edit customer information</IonTitle>
                <IonList>
                    <br />
                    <IonItem>
                        <IonInput
                            label="Name"
                            label-placement="floating"
                            helperText="Enter user's name"
                            fill="outline"
                            type="text"
                            name="full_name"
                            value={userName}
                            placeholder="e.g. A Pink Chair"
                            onIonChange={(e) => setUserName(e.detail.value)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Email"
                            label-placement="floating"
                            helperText="Enter user email"
                            fill="outline"
                            type="email"
                            inputmode="email"
                            pattern="email"
                            name="email"
                            value={userEmail}
                            placeholder="Enter user  email"
                            onIonChange={(e) => setUserEmail(e.detail.value)}
                        />
                    </IonItem>
                    <IonItem>
                        {/* <IonInput
                        label="Role"
                        label-placement="floating"
                        helperText="Enter user role: 1 if admin and 0 if user"
                        fill="outline"
                        type="number"
                        name="role"
                        value={userRole}
                        placeholder="Enter user role"
                        onIonChange={(e) => userRole(e.detail.value)}
                    /> */}

                        <IonSelect
                            label="Role"
                            label-placement="floating"
                            fill="outline"
                            interface="popover"
                            placeholder="Select user role"
                            value={userRole}
                            onIonChange={(e) => userRole(e.detail.value)}
                        >
                            <IonSelectOption value="1">Admin</IonSelectOption>
                            <IonSelectOption value="0">User</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <input type="hidden" name="id" value={userID} />
                    <IonButton color="primary" onClick={handleSubmit}>
                        Save
                    </IonButton>
                </IonList>
            </form>
        </div>
    )
}

export default UserForm
