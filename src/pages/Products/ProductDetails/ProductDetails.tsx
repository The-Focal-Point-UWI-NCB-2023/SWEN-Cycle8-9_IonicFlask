import {
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonThumbnail,
} from '@ionic/react'
import Main from '../../../components/Main/Main'
import styles from './ProductDetails.module.scss'
import { useParams } from 'react-router-dom'
import { cart, cartOutline } from 'ionicons/icons'
import Products from '../Products'

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <Main>
            <IonBreadcrumbs>
                <IonBreadcrumb href="#home">Home</IonBreadcrumb>
                <IonBreadcrumb href="/products">Frames</IonBreadcrumb>
                <IonBreadcrumb href="#film">Name of product</IonBreadcrumb>
            </IonBreadcrumbs>
            <div>
                <IonGrid className={styles.container} fixed>
                    <IonCol>
                        <IonImg
                            src="../../../../uploads/2.png"
                            className={styles.img}
                        />
                    </IonCol>
                    <IonCol class="ion-text-justify">
                        <div className={styles.content}>
                            <h2>{'Sample Name'}</h2>
                            <h3>{'$3124'}</h3>

                            <IonInput
                                label="Quantity"
                                labelPlacement="floating"
                                type="number"
                                fill="outline"
                            ></IonInput>
                            <IonButton>
                                <IonIcon slot="start" icon={cart}></IonIcon>
                                Add to Cart
                            </IonButton>
                        </div>
                    </IonCol>
                    <IonList></IonList>
                </IonGrid>
            </div>
            <br />
            <p> Shop some more looks here </p>
        </Main>
    )
}

export default ProductDetails
