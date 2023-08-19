import Main from '../../../components/Main/Main'
import styles from './ProductDetails.module.scss'
import { useParams } from 'react-router-dom'

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <Main>
            <h2>Product {id} Details Page</h2>
        </Main>
    )
}

export default ProductDetails
