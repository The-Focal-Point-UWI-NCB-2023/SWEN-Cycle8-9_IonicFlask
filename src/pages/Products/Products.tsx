import {
    IonList,
    IonListHeader,
    IonLabel,
    IonItemGroup,
    IonGrid,
} from '@ionic/react'
import Main from '../../components/Main/Main'
import styles from './Products.module.scss'
import ProductCard from '../../components/ProductCard/ProductCard'
// import { productItems } from './ProuductItemLoader'
import { getProducts } from '../../util/api/models/products' // Import the function
import { useState, useEffect } from 'react'

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        fetchProducts()
    }, [])

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
            <IonList>
                <IonGrid fixed className={styles.productGroup}>
                    {products.map((product) => (
                        <ProductCard
                            id={product.id}
                            title={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </IonGrid>
            </IonList>
        </Main>
    )
}

export default Products
