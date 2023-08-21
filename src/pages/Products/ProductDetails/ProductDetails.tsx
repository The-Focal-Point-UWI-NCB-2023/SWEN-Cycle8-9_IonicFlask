import {
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonListHeader,
} from '@ionic/react'
import Main from '../../../components/Main/Main'
import styles from './ProductDetails.module.scss'
import { useParams } from 'react-router-dom'
import { cartOutline } from 'ionicons/icons'

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <Main>
            <IonGrid className={styles.container} fixed>
                <IonCol>
                    <IonImg
                        src="../../../../uploads/2.png"
                        className={styles.img}
                    />
                </IonCol>
                <IonCol>
                    <h2>{'Sample Name'}</h2>
                    <h3>{'$3124'}</h3>
                    <form>
                        <IonInput
                            label="Outline input"
                            labelPlacement="floating"
                            fill="outline"
                            placeholder="Enter text"
                        />
                        <IonButton>
                            Add to Cart <IonIcon icon={cartOutline} />
                        </IonButton>
                    </form>
                </IonCol>
            </IonGrid>
        </Main>
    )
}

export default ProductDetails
