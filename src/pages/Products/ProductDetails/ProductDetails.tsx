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
            <IonBreadcrumbs>
                <IonBreadcrumb href="/">Home</IonBreadcrumb>
                <IonBreadcrumb href="/products">Frames</IonBreadcrumb>
                <IonBreadcrumb href="#">{product?.name}</IonBreadcrumb>
            </IonBreadcrumbs>
            <div>
                <br />
                <IonGrid className={styles.container} fixed>
                    <IonCol>
                        <IonImg
                            src="../../../../uploads/2.png"
                            className={styles.img}
                        />
                        {/* <IonImg src={product?.image} className={styles.img} /> */}
                    </IonCol>
                    <IonCol>
                        <div className={styles.content}>
                            <h2>{product?.name}</h2>
                            <h3>${product?.price.toFixed(2)}</h3>
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
                </IonGrid>
            </div>
        </Main>
    )
}

export default ProductDetails
