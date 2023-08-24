import React, { useEffect, useRef, useState } from 'react'
import Main from '../../components/Main/Main'
import styles from './Admin.module.scss'
import { IonCol, IonGrid, IonRow, IonButton } from '@ionic/react'
import {
    userHeaders,
    test_users,
    prodHeaders,
    products,
    order_headers,
    orders,
} from './AdminFunctions'

import {
    Product,
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from '../../util/api/models/products'

import {
    Order,
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    getOrderById,
} from '../../util/api/models/orders'
import { getUsers } from '../../util/api/models/users'
import { current_User } from '../../util/api/auth/auth'
import { UserAdmin } from '../../components/AdminComponents/UserComponent'
import { AdminProducts } from '../../components/AdminComponents/ProductsComponent'
import { AdminOrders } from '../../components/AdminComponents/OrdersComponents'

const Admin: React.FC = () => {
    const [activeContent, setActiveContent] = useState('CUSTOMERS')
    const [productsList, setProducts] = useState<Product[]>([])
    const [currentUser, setCurrentUser] = useState<any>([])

    // For testing to see if fetch api works
    useEffect(() => {
        fetchCurrentUser()
    }, [])

    useEffect(() => {}, [productsList])

    //Users Fetch

    async function fetchCurrentUser() {
        try {
            const fetchedCurrentUser = await current_User()
            setCurrentUser(fetchedCurrentUser)
        } catch (error) {
            console.log(error)
        }
    }

    const handleButtonClick = (content: React.SetStateAction<string>) => {
        setActiveContent(content)
    }

    return (
        <Main>
            <IonGrid fixed={true} className={styles.adminContainer}>
                <IonRow>
                    <div className={styles.buttons}>
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
                    </div>
                </IonRow>

                {activeContent === 'CUSTOMERS' ? (
                    <>
                        <UserAdmin />
                    </>
                ) : activeContent === 'PRODUCTS' ? (
                    <>
                        <AdminProducts />
                    </>
                ) : activeContent === 'ORDERS' ? (
                    <>
                        <AdminOrders />
                    </>
                ) : null}
            </IonGrid>
        </Main>
    )
}

export default Admin
