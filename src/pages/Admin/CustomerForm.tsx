import React, { useState } from 'react'
import {
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
} from '@ionic/react'
import { api_url_rest, getCsrfToken } from '../../util/constants'

const UserForm = ({ initialValues, onSubmit }) => {
    const [userName, setUserName] = useState(initialValues.name || '')
    const [userEmail, setUserEmail] = useState(initialValues.email || '')
    const [userRole, setUserRole] = useState(initialValues.role || '')
    const [userID, setUserId] = useState(initialValues.id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const csrfToken = await getCsrfToken()
            const formData = new FormData()
            formData.append('full_name', userName)
            formData.append('email', userEmail)
            formData.append('role', userRole)

            const response = await fetch(api_url_rest + `users/${userID}`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': csrfToken,
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
        <form id="form" action="#" method="post" encType="multipart/form-data">
            <IonList>
                <IonItem>
                    <IonInput
                        label="Name"
                        name="full_name"
                        value={userName}
                        placeholder="e.g. A Pink Chair"
                        onIonChange={(e) => setUserName(e.detail.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonInput
                        label="email"
                        name="email"
                        value={userEmail}
                        placeholder="Enter user  email"
                        onIonChange={(e) => setUserEmail(e.detail.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonInput
                        type="number"
                        label="role"
                        name="role"
                        value={userRole}
                        placeholder="Enter user role"
                        onIonChange={(e) => setUserRole(e.detail.value)}
                    />
                </IonItem>
                <input type="hidden" name="id" value={userID} />
                <IonButton color="primary" onClick={handleSubmit}>
                    Save
                </IonButton>
            </IonList>
        </form>
    )
}

export default UserForm
