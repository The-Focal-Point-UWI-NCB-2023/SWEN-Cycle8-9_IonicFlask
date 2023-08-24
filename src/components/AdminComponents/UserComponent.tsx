import React, { useEffect, useState } from 'react'
import { userHeaders } from '../../pages/Admin/AdminFunctions'
import { IonCol, IonRow, IonIcon, useIonViewWillEnter } from '@ionic/react'
import styles from './AdminComponents.module.scss'
import MyModal from '../AdminModalComponent/AdminModal'
import UserForm from '../AdminFormComponents/CustomerForm'
import { create } from 'ionicons/icons'
import { getUsers } from '../../util/api/models/users'
import { test_users } from '../../pages/Admin/AdminFunctions'

export const UserAdmin: React.FC = () => {
    interface User {
        id: number
        full_name: string
        email: string
        role: string
    }

    const [userList, setUsers] = useState<User[]>([])

    const [openModal, setOpenModal] = useState<{ [key: number]: boolean }>({})

    const openCustomerEditModal = (userId: number) => {
        setOpenModal((prevRows) => ({
            ...prevRows,
            [userId]: true,
        }))
    }

    const closeCustomerEditModal = (userId: number) => {
        setOpenModal((prevRows) => ({
            ...prevRows,
            [userId]: false,
        }))
        fetchUsers()
    }

    async function fetchUsers() {
        try {
            const fetchedUsers = await getUsers()
            setUsers(fetchedUsers)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <IonRow className={styles.headerRow}>
                {userHeaders.map((header, index) => (
                    <IonCol
                        key={`header_${index}`}
                        className={styles.headerCol}
                    >
                        {header === 'full_name'
                            ? 'Name'
                            : header.charAt(0).toUpperCase() + header.slice(1)}
                    </IonCol>
                ))}
            </IonRow>
            {userList.map((users, rowIndex) => (
                <IonRow key={`user_${rowIndex}`} className={styles.userRow}>
                    <div className={styles.userInfo}>
                        {userHeaders.slice(0, -1).map((header) => (
                            <IonCol size="6" key={`col_${rowIndex}_${header}`}>
                                {users[header]}
                            </IonCol>
                        ))}

                        <IonCol className={styles.actionCol}>
                            <IonIcon
                                icon={create}
                                className={styles.createIcon}
                                onClick={() => openCustomerEditModal(users.id)}
                            />
                        </IonCol>
                    </div>

                    <MyModal
                        isOpen={!!openModal[users.id]}
                        onClose={() => closeCustomerEditModal(users.id)}
                    >
                        <UserForm
                            initialValues={{
                                id: users.id,
                                name: users.full_name,
                                email: users.email,
                                role: users.role,
                            }}
                            onSubmit={() => closeCustomerEditModal(users.id)}
                        ></UserForm>
                    </MyModal>
                </IonRow>
            ))}
        </>
    )
}
