import React, { useRef, useState } from 'react'
import Main from '../../components/Main/Main'
import styles from './Admin.module.scss'
import {
    IonCol,
    IonGrid,
    IonRow,
    IonButton,
    IonIcon,
    IonModal,
    IonAlert,
} from '@ionic/react'
import {
    userHeaders,
    test_users,
    prodHeaders,
    products,
    order_headers,
    orders,
} from './AdminFunctions'
import { add, create, trash } from 'ionicons/icons' // Import the Ionicons add icon
import MyModal from './AdminModal'
import ProductForm from './ProductForm'
import UserForm from './CustomerForm'
import { FormData } from './CustomerForm'

const Admin: React.FC = () => {
    const [activeContent, setActiveContent] = useState('CUSTOMERS')

    const handleButtonClick = (content: React.SetStateAction<string>) => {
        setActiveContent(content)
    }

    const [showModal, setShowModal] = useState(false)
    const openAddProductModal = () => {
        setShowModal(true)
    }
    const closeAddProductModal = () => {
        setShowModal(false)
    }

    const [modalVisibilities, setModalVisibilities] = useState(
        new Array(products.length).fill(false)
    )

    const openProductEditModal = (index: any) => {
        const updatedVisibilities = [...modalVisibilities]
        updatedVisibilities[index] = true
        setModalVisibilities(updatedVisibilities)
    }

    const closeProductEditModal = (index: any) => {
        const updatedVisibilities = [...modalVisibilities]
        updatedVisibilities[index] = false
        setModalVisibilities(updatedVisibilities)
    }

    const [customermodalVisibilities, setcustomerModalVisibilities] = useState(
        new Array(test_users.length).fill(false)
    )

    const openCustomerEditModal = (index: number) => {
        const updatedCustomerVisibilities = [...customermodalVisibilities]
        updatedCustomerVisibilities[index] = true
        setcustomerModalVisibilities(updatedCustomerVisibilities)
    }

    const closeCustomerEditModal = (index: any) => {
        const updatedCustomerVisibilities = [...customermodalVisibilities]
        updatedCustomerVisibilities[index] = false
        setcustomerModalVisibilities(updatedCustomerVisibilities)
    }

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    const openDeleteConfirmation = () => {
        setShowDeleteConfirmation(true)
    }

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false)
    }

    return (
        <Main>
            <IonGrid fixed={true} className={styles.adminContainer}>
                <IonRow className={styles.buttons}>
                    <IonButton
                        className={styles.button}
                        onClick={() => handleButtonClick('CUSTOMERS')}
                    >
                        CUSTOMERS
                    </IonButton>
                    <IonButton
                        className={styles.button}
                        onClick={() => handleButtonClick('PRODUCTS')}
                    >
                        PRODUCTS
                    </IonButton>
                    <IonButton
                        className={styles.button}
                        onClick={() => handleButtonClick('ORDERS')}
                    >
                        ORDERS
                    </IonButton>
                </IonRow>
                {activeContent === 'CUSTOMERS' ? (
                    <>
                        <IonRow className={styles.headerRow}>
                            {userHeaders.map((header, index) => (
                                <IonCol
                                    key={`header_${index}`}
                                    className={styles.headerCol}
                                >
                                    {header}
                                </IonCol>
                            ))}
                        </IonRow>
                        {test_users.map((users, rowIndex) => (
                            <IonRow
                                key={`user_${rowIndex}`}
                                className={styles.userRow}
                            >
                                {userHeaders.slice(0, -1).map((header) => (
                                    <IonCol key={`col_${rowIndex}_${header}`}>
                                        {users[header]}
                                    </IonCol>
                                ))}
                                <IonCol className={styles.actionCol}>
                                    <IonIcon
                                        icon={create}
                                        className={styles.createIcon}
                                        onClick={() =>
                                            openCustomerEditModal(rowIndex)
                                        }
                                    />
                                </IonCol>

                                <MyModal
                                    isOpen={customermodalVisibilities[rowIndex]}
                                    onClose={() =>
                                        closeCustomerEditModal(rowIndex)
                                    }
                                >
                                    <UserForm
                                        currentUser={{
                                            name: users['Name'],
                                            email: users['Email'],
                                            password: users['Password'],
                                            role: users['Role'],
                                        }}
                                        onSubmit={function (
                                            formData: FormData
                                        ): void {
                                            throw new Error(
                                                'Function not implemented.'
                                            )
                                        }}
                                    ></UserForm>
                                </MyModal>
                            </IonRow>
                        ))}
                    </>
                ) : activeContent === 'PRODUCTS' ? (
                    <>
                        <IonButton
                            color="success"
                            className={styles.prodAdd}
                            onClick={openAddProductModal}
                        >
                            <IonIcon icon={add} />
                        </IonButton>
                        <MyModal
                            isOpen={showModal}
                            onClose={closeAddProductModal}
                        >
                            <ProductForm
                                initialProduct={{
                                    image: '',
                                    title: '',
                                    description: '',
                                    price: 0,
                                }}
                                onSubmit={function (newProduct: {
                                    image: string
                                    title: string
                                    description: string
                                    price: number
                                }): void {
                                    throw new Error('Function not implemented.')
                                }}
                            ></ProductForm>
                        </MyModal>

                        <IonRow className={styles.headerRow}>
                            {prodHeaders.map((header, index) => (
                                <IonCol
                                    key={`header_${index}`}
                                    className={styles.headerCol}
                                >
                                    {header}
                                </IonCol>
                            ))}
                        </IonRow>
                        {products.map((prod, rowIndex) => (
                            <IonRow
                                key={`user_${rowIndex}`}
                                className={styles.userRow}
                            >
                                {prodHeaders.slice(0, -1).map((header) => (
                                    <IonCol key={`col_${rowIndex}_${header}`}>
                                        {prod[header]}
                                    </IonCol>
                                ))}
                                <IonCol className={styles.actionCol}>
                                    <IonIcon
                                        icon={create}
                                        className={styles.createIcon}
                                        onClick={() =>
                                            openProductEditModal(rowIndex)
                                        }
                                    />
                                    <MyModal
                                        isOpen={modalVisibilities[rowIndex]}
                                        onClose={() =>
                                            closeProductEditModal(rowIndex)
                                        }
                                    >
                                        <ProductForm
                                            initialProduct={{
                                                image: prod['Image'],
                                                title: prod['Title'],
                                                description:
                                                    prod['Description'],
                                                price: prod['Price'],
                                            }}
                                            onSubmit={function (updatedProduct: {
                                                image: string
                                                title: string
                                                description: string
                                                price: number
                                            }): void {
                                                throw new Error(
                                                    'Function not implemented.'
                                                )
                                            }}
                                        ></ProductForm>
                                    </MyModal>
                                    <IonIcon
                                        icon={trash}
                                        className={styles.delIcon}
                                        onClick={openDeleteConfirmation}
                                    />

                                    <IonAlert
                                        isOpen={showDeleteConfirmation}
                                        onDidDismiss={closeDeleteConfirmation}
                                        header="Confirm Deletion"
                                        message="Are you sure you want to delete this product?"
                                        buttons={[
                                            {
                                                text: 'Cancel',
                                                role: 'cancel',
                                                handler:
                                                    closeDeleteConfirmation,
                                            },
                                            {
                                                text: 'Delete',
                                                handler: () => {
                                                    // Call your delete product function here
                                                    // Close the confirmation modal afterward
                                                    closeDeleteConfirmation()
                                                },
                                            },
                                        ]}
                                    />
                                </IonCol>
                            </IonRow>
                        ))}
                    </>
                ) : activeContent === 'ORDERS' ? (
                    <>
                        <IonRow className={styles.headerRow}>
                            {order_headers.map((header, index) => (
                                <IonCol
                                    key={`header_${index}`}
                                    className={styles.headerCol}
                                >
                                    {header}
                                </IonCol>
                            ))}
                        </IonRow>
                        {orders.map((order, rowIndex) => (
                            <IonRow
                                key={`user_${rowIndex}`}
                                className={styles.userRow}
                            >
                                {order_headers.map((header) => (
                                    <IonCol key={`col_${rowIndex}_${header}`}>
                                        {order[header]}
                                    </IonCol>
                                ))}
                            </IonRow>
                        ))}
                    </>
                ) : null}
            </IonGrid>
        </Main>
    )
}

export default Admin
