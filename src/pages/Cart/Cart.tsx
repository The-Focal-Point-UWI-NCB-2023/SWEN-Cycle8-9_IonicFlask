import Main from '../../components/Main/Main'
import styles from './Cart.module.scss'
import React, { useEffect, useState } from 'react'
import {
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonRow,
    IonImg,
    IonText,
    IonGrid,
    IonCol,
    IonIcon,
    IonInput,
    IonTitle,
    IonAlert,
    useIonViewWillEnter,
} from '@ionic/react'
import { productItems } from '../Products/ProuductItemLoader'
import { cart, eye, trash } from 'ionicons/icons'
import { props } from 'cypress/types/bluebird'
import { Link } from 'react-router-dom'
import { makePayment } from '../../util/api/payments/payment'
import { getOrderByUserID } from '../../util/api/models/orders'
import { current_User } from '../../util/api/auth/auth'

const Cart: React.FC = () => {
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState<number>(1)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [productToDeleteId, setProductToDeleteId] = useState<number | null>(
        null
    )
    const [currentUser, setCurrentUser] = useState<any>([])
    const [userLineItems, setLineItems] = useState([])

    async function fetchCurrentUser() {
        try {
            const fetchedCurrentUser = await current_User()
            setCurrentUser(fetchedCurrentUser)
            console.log(currentUser)
        } catch (error) {
            console.log(error)
        }
    }

    const [stripeLink, setStripeLink] = useState()

    const orderData = {
        id: 63,
        user_id: 42,
        billing_address: 'lorem ipsum',
        total_amount: '0.00',
        status: 'pending',
        line_items: [
            {
                product_id: 56,
                product_name: 'I',
                product_image: './uploads/Screenshot_2023-06-08_113411.png',
                product_price: '10.00',
                qty: 1,
            },
            {
                product_id: 56,
                product_name: 'I',
                product_image: './uploads/Screenshot_2023-06-08_113411.png',
                product_price: '10.00',
                qty: 1,
            },
            {
                product_id: 56,
                product_name: 'I',
                product_image: './uploads/Screenshot_2023-06-08_113411.png',
                product_price: '10.00',
                qty: 1,
            },
        ],
    }

    const parsedLineItems = orderData.line_items
    console.log(parsedLineItems)

    const openDeleteConfirmation = (productId: number) => {
        setProductToDeleteId(productId)
        setShowDeleteConfirmation(true)
    }

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false)
    }

    useEffect(() => {
        ;(async () => {
            fetchCurrentUser()
            const subtotal = parsedLineItems
                .slice(0, 4)
                .reduce(
                    (acc, product) => acc + parseFloat(product.product_price),
                    0
                )
            setTotal(subtotal)
            populateOrder()
        })()
    }, [setLineItems])

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newQuantity = parseInt(event.target.value)
        setQuantity(newQuantity)
    }

    // const handleCheckout = () => {
    //     makePayment()
    //         .then((response) => {
    //             console.log('Payment successful')
    //         })
    //         .catch((error) => {
    //             console.log('There is an error at redirecting')
    //         })
    // }

    async function handleCheckout() {
        try {
            const cartData = {
                id: 62,
                user_id: currentUser.id,
                billing_address: 'lorem ipsum',
                total_amount: total,
                status: 'pending',
                line_items: parsedLineItems,
                // Other data you want to include
            }
            const fetchedURL = await makePayment(cartData)
            setStripeLink(fetchedURL)
            window.location.href = fetchedURL
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    async function populateOrder() {
        try {
            const userOrder = await getOrderByUserID(currentUser.id)
            // console.log("User Order Data:", userOrder); // Add this log
            setLineItems(userOrder)
            console.log('After:', userLineItems) // Add this log
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }
    // fetchCurrentUser()
    // populateOrder()

    return (
        <Main>
            <IonGrid className={styles.container}>
                <h2>Your Shopping Cart</h2>
                <IonRow className={styles.cartRowTotal}>
                    <IonTitle className={styles.total}>
                        Total <span>${total}</span>
                    </IonTitle>
                    <IonButton
                        className={styles.checkoutBtn}
                        onClick={handleCheckout}
                    >
                        CHECKOUT
                    </IonButton>
                </IonRow>
                {parsedLineItems.map((prod, index) => (
                    <IonRow className={styles.cartRow}>
                        <IonCol>
                            <IonImg
                                src={prod.product_image}
                                className={styles.cartImg}
                            />
                        </IonCol>
                        <IonCol>
                            <IonTitle className={styles.cartTitle}>
                                {prod.product_name}
                            </IonTitle>
                        </IonCol>
                        <IonCol className={styles.productPrice}>
                            <IonText className="Price">
                                ${prod.product_price}
                            </IonText>
                        </IonCol>

                        <div className={styles.qtyContainer}>
                            <IonCol>
                                <IonInput
                                    className={styles.productQuantity}
                                    label="Qty"
                                    labelPlacement="floating"
                                    type="number"
                                    fill="outline"
                                    placeholder="000"
                                    min="1"
                                    value={prod.qty}
                                    onIonChange={() => handleQuantityChange}
                                ></IonInput>
                            </IonCol>

                            <IonCol className={styles.remove}>
                                <IonIcon
                                    icon={trash}
                                    className={styles.delIcon}
                                    onClick={() =>
                                        openDeleteConfirmation(prod.product_id)
                                    }
                                />
                            </IonCol>
                            <IonAlert
                                isOpen={showDeleteConfirmation}
                                onDidDismiss={closeDeleteConfirmation}
                                header="Confirm Deletion"
                                message="Are you sure you want to delete this product?"
                                buttons={[
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: closeDeleteConfirmation,
                                    },
                                    {
                                        text: 'Delete',
                                        handler: () => {
                                            if (productToDeleteId != null) {
                                                fetchDeleteProduct(
                                                    productToDeleteId.toString()
                                                )
                                                setProductToDeleteId(null)
                                            }
                                            closeDeleteConfirmation()
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </IonRow>
                ))}
                <IonRow className={styles.cartRowTotal}>
                    <IonTitle className={styles.total}>
                        Total <span>${total}</span>
                    </IonTitle>
                    <IonButton className={styles.checkoutBtn}>
                        CHECKOUT
                    </IonButton>
                </IonRow>
            </IonGrid>
        </Main>
    )
}
export default Cart
