import {
    IonList,
    IonListHeader,
    IonLabel,
    IonItemGroup,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react'
import Main from '../../components/Main/Main'
import styles from './Products.module.scss'
import ProductCard from '../../components/ProductCard/ProductCard'
// import { productItems } from './ProuductItemLoader'
import { getProducts } from '../../util/api/models/products' // Import the function
import { useState, useEffect } from 'react'
import { current_User } from '../../util/api/auth/auth'

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([])
    const [currentUser, setCurrentUser] = useState<any[]>([])

    useEffect(() => {
        fetchProducts()
        fetchCurrentUser()
    }, [])

    async function fetchCurrentUser() {
        try {
            const fetchedCurrentUser = await current_User()
            setCurrentUser(fetchedCurrentUser)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchProducts() {
        try {
            const fetchedProducts = await getProducts()
            setProducts(fetchedProducts)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    return (
        <Main>
            <div className={styles.productTitle}>
                <h2>PRODUCTS</h2>
                <h3>Shop from our envied collection of frames here!</h3>
            </div>
            <IonList>
                <IonGrid fixed={true} className={styles.productGroup}>
                    <IonRow class="ion-justify-content-around">
                        {products.map((product) => (
                            <IonCol size="12" size-sm="6" size-md="5">
                                <ProductCard
                                    user={currentUser}
                                    id={product.id}
                                    title={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonList>
        </Main>
    )
}

export default Products
