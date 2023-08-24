import {
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
} from '@ionic/react'
import Main from '../../../components/Main/Main'
import styles from './ProductDetails.module.scss'
import { Link, useParams } from 'react-router-dom'
import { caretBackOutline, cart, cartOutline } from 'ionicons/icons'
import Products from '../Products'
import { useState, useEffect } from 'react'
import { Product, getProductById } from '../../../util/api/models/products'
import ProductCard from '../../../components/ProductCard/ProductCard'

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product>()

    const [isAuthed] = useState(localStorage.getItem('isAuthed') === 'true')

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
            <br />
            <IonBreadcrumbs>
                <IonBreadcrumb routerLink="/">Home</IonBreadcrumb>
                <IonBreadcrumb routerLink="/products">Products</IonBreadcrumb>
                <IonBreadcrumb routerLink="#">{product?.name}</IonBreadcrumb>
            </IonBreadcrumbs>
            <div>
                <br />
                <IonGrid className={styles.container} fixed>
                    <IonCol size="12" size-sm="4">
                        <IonImg
                            src="../../../../uploads/2.png"
                            className={styles.coverImage}
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
                            {isAuthed ? (
                                <IonButton>
                                    <IonIcon slot="start" icon={cart}></IonIcon>
                                    Add to Cart
                                </IonButton>
                            ) : (
                                <Link to={'/login'} className={styles.link}>
                                    <IonButton>
                                        <IonIcon
                                            slot="start"
                                            icon={cart}
                                        ></IonIcon>
                                        Add to Cart
                                    </IonButton>
                                </Link>
                            )}
                            <IonButton routerLink="/products">
                                <IonIcon
                                    slot="start"
                                    icon={caretBackOutline}
                                ></IonIcon>
                                Back to Shopping
                            </IonButton>
                        </div>
                    </IonCol>
                </IonGrid>
            </div>
        </Main>
    )
}

export default ProductDetails
