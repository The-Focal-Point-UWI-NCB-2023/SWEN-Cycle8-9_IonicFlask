import {
    IonItem,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
} from '@ionic/react'
import { PropsWithChildren } from 'react'
import styles from './ProductCard.module.scss'

interface Props {
    image: string
    title: string
    price: number
}

const ProductCard: React.FC<PropsWithChildren<Props>> = (props) => {
    return (
        <IonItem button>
            <IonCard className={styles.card}>
                <img
                    className={styles.img}
                    alt="Product"
                    src={'../../../uploads/' + props.image + '.png'}
                />
                <IonCardHeader>
                    <IonCardTitle>{props.title}</IonCardTitle>
                    <IonCardSubtitle>${props.price}</IonCardSubtitle>
                </IonCardHeader>
            </IonCard>
        </IonItem>
    )
}

export default ProductCard
