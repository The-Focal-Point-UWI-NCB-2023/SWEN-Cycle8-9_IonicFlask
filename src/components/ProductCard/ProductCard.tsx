import {
    IonItem,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonImg,
} from '@ionic/react'
import { PropsWithChildren } from 'react'
import styles from './ProductCard.module.scss'
import { Link } from 'react-router-dom'

interface Props {
    id: number
    image: string
    title: string
    price: number
}

const ProductCard: React.FC<PropsWithChildren<Props>> = (props) => {
    return (
        <IonItem button>
            <Link to={'/products/' + props.id} className={styles.link}>
                <IonCard className={styles.card}>
                    <IonImg
                        className={styles.img}
                        alt="Product"
                        src={'../../../uploads/' + props.image + '.png'}
                    />
                    <IonCardHeader className={styles.cardHeader}>
                        <IonCardTitle>{props.title}</IonCardTitle>
                        <IonCardSubtitle>
                            <b>${props.price}</b>
                        </IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
            </Link>
        </IonItem>
    )
}

export default ProductCard
