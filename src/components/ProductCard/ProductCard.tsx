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
    IonBadge,
    IonCol,
    IonNote,
} from '@ionic/react'
import { PropsWithChildren, useState, useEffect } from 'react'
import styles from './ProductCard.module.scss'
import { Link } from 'react-router-dom'
import { cart, eye, star } from 'ionicons/icons'

interface Props {
    id: number
    image: string
    title: string
    price: number
}

const ProductCard: React.FC<PropsWithChildren<Props>> = (props) => {
    const [isAuthed, setIsAuthed] = useState(
        localStorage.getItem('isAuthed') === 'true'
    )

    return (
        // <IonItem button>
        //     <Link to={'products/' + props.id} className={styles.link}>
        //         <IonCard className={styles.card} color="light">
        //             <IonImg
        //                 className={styles.img}
        //                 alt="Product"
        //                 src={'../../../uploads/' + props.image + '.png'}
        //             />
        //             <hr />
        //             <IonCardHeader className={styles.cardHeader}>
        //                 <IonCardTitle>{props.title}</IonCardTitle>
        //                 <IonCardSubtitle>
        //                     <b>${props.price}</b>
        //                 </IonCardSubtitle>
        //             </IonCardHeader>
        // <IonButton>
        //     <IonIcon slot="start" icon={cart}></IonIcon>
        //     View Product
        // </IonButton>
        // <IonButton>
        //     <IonIcon slot="start" icon={cart}></IonIcon>
        //     Add to Cart
        // </IonButton>
        //         </IonCard>
        //     </Link>
        // </IonItem>

        <IonItem button>
            <Link to={'products/' + props.id} className={styles.link}>
                <IonCol>
                    <div className={styles.productContainer}>
                        <div
                            style={{
                                backgroundImage: `url(${
                                    '../../../uploads/' + props.image + '.png'
                                })`,
                            }}
                            className={styles.coverImage}
                        />
                        <h2 className={styles.productTitle}>{props.title}</h2>
                        <div className={styles.productInfo}>
                            <div>
                                <IonBadge color="secondary">
                                    ${props.price.toFixed(2)}
                                </IonBadge>
                            </div>
                        </div>
                        <div>
                            {isAuthed ? (
                                <Link to={'cart'} className={styles.link}>
                                    <IonButton>
                                        <IonIcon
                                            slot="start"
                                            icon={cart}
                                        ></IonIcon>
                                        Add to Cart
                                    </IonButton>
                                </Link>
                            ) : (
                                <Link to={'login'} className={styles.link}>
                                    <IonButton>
                                        <IonIcon
                                            slot="start"
                                            icon={cart}
                                        ></IonIcon>
                                        Add to Cart
                                    </IonButton>
                                </Link>
                            )}
                            <Link
                                to={'products/' + props.id}
                                className={styles.link}
                            >
                                <IonButton id={styles.viewButton}>
                                    <IonIcon slot="start" icon={eye}></IonIcon>
                                    View Product
                                </IonButton>
                            </Link>
                        </div>
                    </div>
                </IonCol>
            </Link>
        </IonItem>
    )
}

export default ProductCard
