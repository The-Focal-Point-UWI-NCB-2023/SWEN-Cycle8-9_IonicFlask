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
import { productItems } from './ProuductItemLoader'

const Products: React.FC = () => {
    const products = productItems

    return (
        <Main>
            <IonList>
                <IonGrid fixed className={styles.productGroup}>
                    {productItems.map((product) => (
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
