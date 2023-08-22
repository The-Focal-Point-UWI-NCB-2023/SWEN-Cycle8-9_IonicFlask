import React, { useState } from 'react'
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react'
import { User, updateUser } from '../../util/api/models/users'

interface UserFormProps {
    initialUser: User // You'll need to define the User type
    onSubmit: (updatedUser: User) => void
}

const UserForm: React.FC<UserFormProps> = ({ initialUser, onSubmit }) => {
    const [user, setUser] = useState<User>(initialUser)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            // Call the updateUser function
            const updatedUserResponse = await updateUser(
                user.id.toString(),
                user
            )

            // Call onSubmit with the updated user data
            onSubmit(updatedUserResponse)
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    return (
        <form className="" onSubmit={handleSubmit}>
            <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput
                    name="name"
                    value={user.full_name}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                    name="email"
                    value={user.email}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Role</IonLabel>
                <IonInput
                    name="role"
                    value={user.role}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonButton expand="full" type="submit">
                Save Changes
            </IonButton>
        </form>
    )
}

export default UserForm
