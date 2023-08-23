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
} from '@ionic/react'
import { productItems } from '../Products/ProuductItemLoader'
import { cart, eye, trash } from 'ionicons/icons'
import { props } from 'cypress/types/bluebird'
import { Link } from 'react-router-dom'

const Cart: React.FC = () => {
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState<number>(1)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [productToDeleteId, setProductToDeleteId] = useState<number | null>(
        null
    )

    const openDeleteConfirmation = (productId: number) => {
        setProductToDeleteId(productId)
        setShowDeleteConfirmation(true)
    }

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false)
    }

    useEffect(() => {
        const subtotal = productItems
            .slice(0, 4)
            .reduce((acc, product) => acc + product.price, 0)
        setTotal(subtotal)
    }, [])

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newQuantity = parseInt(event.target.value)
        setQuantity(newQuantity)
    }

    return (
        <Main>
            <IonGrid className={styles.container}>
                <h2>Your Shopping Cart</h2>
                <IonRow className={styles.cartRowTotal}>
                    <IonTitle className={styles.total}>
                        Total <span>${total}</span>
                    </IonTitle>
                    <IonButton className={styles.checkoutBtn}>
                        CHECKOUT
                    </IonButton>
                </IonRow>
                {productItems.slice(0, 4).map((prod, index) => (
                    <IonRow className={styles.cartRow}>
                        <IonCol>
                            <IonImg
                                src={'../../../uploads/' + prod.image + '.png'}
                                className={styles.cartImg}
                            />
                        </IonCol>
                        <IonCol>
                            <IonTitle className={styles.cartTitle}>
                                {prod.name}
                            </IonTitle>
                        </IonCol>
                        <IonCol className={styles.productPrice}>
                            <IonText className="Price">${prod.price}</IonText>
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
                                    value={quantity}
                                    onIonChange={() => handleQuantityChange}
                                ></IonInput>
                            </IonCol>

                            <IonCol className={styles.remove}>
                                <IonIcon
                                    icon={trash}
                                    className={styles.delIcon}
                                    onClick={() =>
                                        openDeleteConfirmation(prod.id)
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
