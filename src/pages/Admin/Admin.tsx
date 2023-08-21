import React, { useEffect, useRef, useState } from 'react'
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
    useIonViewWillEnter,
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
import {
    LineItem,
    createLineItem,
    deleteLineItem,
    getLineItemById,
    getLineItems,
    updateLineItem,
} from '../../util/api/models/line_items'

const Admin: React.FC = () => {
    const [activeContent, setActiveContent] = useState('CUSTOMERS')
    const [productss, setProducts] = useState<Product>()
    const [orderss, setOrders] = useState<Order>()
    const [userss, setUsers] = useState<any>()
    const [lineitmess, setLineItems] = useState<LineItem>()

    useEffect(() => {
        fetchProducts()
        fetchOrders()
        fetchUsers()
        fetchLineItems()
    }, [])

    useEffect(() => {
        console.log('Working prod')
        console.log(productss)
        console.log('before')
        console.log(orderss)
        console.log(userss)
        console.log('next')
        console.log(lineitmess)
    }, [productss, orderss]) // Add productss as a dependency

    //Users Fetch

    async function fetchUsers() {
        try {
            const fetchedUsers = await getUsers()
            setUsers(fetchedUsers)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    //Products fetch
    const productData = {
        name: 'New Product',
        description: 'A new product',
        price: 19.99,
        image: 'image.jpg',
        status: 'TEST',
        user_id: 20,
    }
    async function fetchProducts() {
        try {
            const fetchedProducts = await getProducts()
            setProducts(fetchedProducts)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    async function fetchcreateProduct(newProduct: Product) {
        try {
            // Call your API to create the new product
            const createdProduct = await createProduct(newProduct)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchDeleteProduct(productId: string) {
        try {
            // Call your API to create the new product
            const deletedProduct = await deleteProduct(productId)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchUpdateOrder(orderID: string, newOrder: Order) {
        try {
            // Call your API to create the new product
            const updatedProduct = await updateOrder(orderID, newOrder)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchProductsById(productId: string) {
        try {
            // Call your API to create the new product
            const fetchedProductByID = await getProductById(productId)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    //Orders Fetch

    async function fetchOrders() {
        try {
            const fetchedOrders = await getOrders()
            setOrders(fetchedOrders)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    async function fetchcreateOrder(newOrder: Order) {
        try {
            // Call your API to create the new product
            const createdOder = await createOrder(newOrder)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchDeleteOrder(orderID: string) {
        try {
            // Call your API to create the new product
            const deletedOrder = await deleteOrder(orderID)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchUpdateProduct(orderID: string, newOrder: Order) {
        try {
            // Call your API to create the new product
            const updatedOrder = await updateOrder(orderID, newOrder)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchOrderById(orderID: string) {
        try {
            // Call your API to create the new product
            const fetchedOrderByID = await getOrderById(orderID)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    //Line Items Fetch

    //Line Items Fetch

    async function fetchLineItems() {
        try {
            const fetchedLineItems = await getLineItems()
            setLineItems(fetchedLineItems)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    async function fetchcreateLineItems(newLineItems: LineItem) {
        try {
            // Call your API to create the new product
            const createdOder = await createLineItem(newLineItems)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchDeleteLineItems(LineItemsID: string) {
        try {
            // Call your API to create the new product
            const deletedLineItems = await deleteLineItem(LineItemsID)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchUpdateProduct(
        LineItemsID: string,
        newLineItems: LineItem
    ) {
        try {
            // Call your API to create the new product
            const updatedLineItems = await updateLineItem(
                LineItemsID,
                newLineItems
            )
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchLineItemsById(LineItemsID: string) {
        try {
            // Call your API to create the new product
            const fetchedLineItemsByID = await getLineItemById(LineItemsID)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

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
