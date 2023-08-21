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
import { useState, useEffect } from 'react'
import { Product, getProductById } from '../../../util/api/models/products'

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        fetchProduct()
    }, [])

    async function fetchProduct() {
        try {
            const fetchedProduct = await getProductById(id)
            setProduct(fetchedProduct)
        } catch (error) {
            console.error('Error fetching product:', error)
        }
    }
    return (
        <Main>
            <IonGrid className={styles.container} fixed>
                <IonCol>
                    <IonImg src={product?.image} className={styles.img} />
                </IonCol>
                <IonCol>
                    <h2>{product?.name}</h2>
                    <h3>${product?.price.toFixed(2)}</h3>
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
