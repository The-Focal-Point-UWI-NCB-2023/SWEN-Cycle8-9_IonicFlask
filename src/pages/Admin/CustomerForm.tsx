import React, { useState } from 'react';
import { IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/react';

export interface FormData {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface UserFormProps {
    onSubmit: (formData: FormData) => void;
    currentUser: FormData
}

const UserForm: React.FC<UserFormProps> = ({ currentUser,onSubmit }) => {
    const [formData, setFormData] = useState(currentUser)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            email: '',
            password: '',
            role: '',
        });
    };

    const isRoleSelected = formData.role !== '';

    return (
        <form onSubmit={handleSubmit}>
        <IonLabel>Name:</IonLabel>
        <IonInput
            type="text"
            name="name"
            value={formData.name}
            onIonChange={() => handleChange}
            required
            disabled={true}
        />
        <IonLabel>Email:</IonLabel>
        <IonInput
            type="email"
            name="email"
            value={formData.email}
            onIonChange={() => handleChange}
            required
            disabled= {true}
        />
        <IonLabel>Password:</IonLabel>
        <IonInput
            type="password"
            name="password"
            value={formData.password}
            onIonChange={() => handleChange}
            required
            disabled= {true}
        />
        <IonLabel>Role:</IonLabel>
        <IonSelect
            name="role"
            value={formData.role}
            onIonChange={ () => handleChange}
            
        >
            <IonSelectOption value="">Select Role</IonSelectOption>
            <IonSelectOption value="admin">Admin</IonSelectOption>
            <IonSelectOption value="user">User</IonSelectOption>
        </IonSelect>
        <IonButton type="submit" >Submit</IonButton>
    </form>
    );
};

export default UserForm;
