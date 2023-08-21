import {
    IonItem,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonImg,
    IonButton,
    IonIcon,
} from '@ionic/react'
import { PropsWithChildren } from 'react'
import styles from './ProductCard.module.scss'
import { Link } from 'react-router-dom'
import { cart, star } from 'ionicons/icons'

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
                <IonCard className={styles.card} color="light">
                    <IonImg
                        className={styles.img}
                        alt="Product"
                        src={'../../../uploads/' + props.image + '.png'}
                    />
                    <hr />
                    <IonCardHeader className={styles.cardHeader}>
                        <IonCardTitle>{props.title}</IonCardTitle>
                        <IonCardSubtitle>
                            <b>${props.price}</b>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonButton>
                        <IonIcon slot="start" icon={cart}></IonIcon>
                        View Product
                    </IonButton>
                    <IonButton>
                        <IonIcon slot="start" icon={cart}></IonIcon>
                        Add to Cart
                    </IonButton>
                </IonCard>
            </Link>
        </IonItem>
    )
}

export default ProductCard
