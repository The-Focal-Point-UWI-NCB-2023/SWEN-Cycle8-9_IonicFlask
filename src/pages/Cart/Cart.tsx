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
} from '@ionic/react'
import { productItems } from '../Products/ProuductItemLoader'
import { trash } from 'ionicons/icons'

const Cart: React.FC = () => {
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState<number>(1)

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
                <IonRow className={styles.cartRowTotal}>
                    <IonText className={styles.total}>Total : ${total}</IonText>
                    <IonButton className={styles.checkoutBtn}>
                        CHECKOUT
                    </IonButton>
                </IonRow>
                {productItems.slice(0, 4).map((prod, idx) => (
                    <IonRow className={styles.cartRow}>
                        <IonCol>
                            <IonImg
                                src={'../../../uploads/' + prod.image + '.png'}
                                className={styles.Cartimg}
                            ></IonImg>
                        </IonCol>
                        <IonCol className={styles.productDetails}>
                            <IonText className="ProductName">
                                {prod.name}
                            </IonText>
                            <IonText className="Price">${prod.price}</IonText>
                            <IonItem>
                                <IonInput
                                    label="Quantity"
                                    type="number"
                                    placeholder="000"
                                    value={quantity}
                                    onIonChange={() => handleQuantityChange}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol className={styles.remove}>
                            <IonIcon icon={trash} className={styles.delIcon} />
                        </IonCol>
                    </IonRow>
                ))}
            </IonGrid>
        </Main>
    )
}

export default Cart
