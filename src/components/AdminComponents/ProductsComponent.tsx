import { IonAlert, IonButton, IonCol, IonIcon, IonRow } from '@ionic/react'
import MyModal from '../AdminModalComponent/AdminModal'
import ProductForm from '../AdminFormComponents/ProductForm'
import { Product, getProducts } from '../../util/api/models/products'
import { useEffect, useState } from 'react'
import styles from './AdminComponents.module.scss'
import { add, create, trash } from 'ionicons/icons'
import { prodHeaders } from '../../pages/Admin/AdminFunctions'
import { current_User } from '../../util/api/auth/auth'
import { deleteProduct } from '../../util/api/models/products'
import { products } from '../../pages/Admin/AdminFunctions'

export const AdminProducts: React.FC = () => {
    const [openEditModal, setOpenEditModal] = useState<{
        [key: number]: boolean
    }>({})
    const [productsList, setProducts] = useState<Product[]>([])
    const [openAddModal, setOpenAddModal] = useState(false)
    const [currentUser, setCurrentUser] = useState<any>([])
    const [productToDeleteId, setProductToDeleteId] = useState<number | null>(
        null
    )
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    ///////////////////////////////////////////////////////////////////// FETCH ////////////////////////////////////////////////////////////////////////////////////////////

    async function fetchProducts() {
        try {
            const fetchedProducts = await getProducts()
            setProducts(fetchedProducts.reverse())
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    async function fetchDeleteProduct(productId: string) {
        try {
            // Call your API to delete a product
            const deletedProduct = await deleteProduct(productId)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    async function fetchCurrentUser() {
        try {
            const fetchedCurrentUser = await current_User()
            setCurrentUser(fetchedCurrentUser)
        } catch (error) {
            console.log(error)
        }
    }

    ////////////////////////////////////////////////////////////////////////MODAL HANDLER/////////////////////////////////////////////////////////////////////////////////

    //Opens and closes delete products modal
    const openDeleteConfirmation = (productId: number) => {
        setProductToDeleteId(productId)
        setShowDeleteConfirmation(true)
    }

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false)
        fetchProducts()
    }

    //
    // These functions open and close the Add button for products
    const openAddProductModal = () => {
        setOpenAddModal(true)
    }
    const closeAddProductModal = () => {
        setOpenAddModal(false)
        fetchProducts()
    }
    //
    //These function Open and Close the Edit Modal for products
    const openProductsEditModal = (userId: number) => {
        console.log(userId)
        setOpenEditModal((prevRows) => ({
            ...prevRows,
            [userId]: true,
        }))
    }

    const closeProductsEditModal = (userId: number) => {
        setOpenEditModal((prevRows) => ({
            ...prevRows,
            [userId]: false,
        }))
        fetchProducts()
    }

    //

    useEffect(() => {
        fetchProducts()
        fetchCurrentUser()
    }, [])

    ////////////////////////////////////////////////////////////////////////////////PRODUCT CARD///////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <IonButton
                color="success"
                className={styles.prodAdd}
                onClick={openAddProductModal}
            >
                <IonIcon icon={add} />
            </IonButton>
            <MyModal isOpen={openAddModal} onClose={closeAddProductModal}>
                <ProductForm
                    initialValues={{
                        user_id: currentUser.id,
                        name: '',
                        description: '',
                        price: 0,
                        status: '',
                        mode: 'create',
                    }}
                    onSubmit={() => closeAddProductModal()}
                ></ProductForm>
            </MyModal>

            {productsList.map((prod, rowIndex) => (
                /*  This loop is for the rows of acutal products presented to the user */
                <IonRow key={`user_${rowIndex}`} className={styles.userRow}>
                    <div className={styles.productInfo}>
                        {prodHeaders.slice(0, -1).map((header) => (
                            <div className={styles.productInfoCon}>
                                <IonCol
                                    size="6"
                                    key={`col_${rowIndex}_${header}`}
                                >
                                    {header === 'price' ? (
                                        `$${prod[header]}`
                                    ) : header === 'image' ? (
                                        <img
                                            src={`./uploads/${prod[header]}`}
                                            alt="Product"
                                            className={styles.productImage}
                                        />
                                    ) : (
                                        prod[header]
                                    )}{' '}
                                </IonCol>
                            </div>
                        ))}
                    </div>
                    <IonCol className={styles.actionCol}>
                        <IonIcon
                            icon={create}
                            className={styles.createIcon}
                            onClick={() => openProductsEditModal(prod.id)}
                        />
                        <MyModal
                            isOpen={!!openEditModal[prod.id]}
                            onClose={() => closeProductsEditModal(prod.id)}
                        >
                            <ProductForm
                                initialValues={{
                                    name: prod.name,
                                    description: prod.description,
                                    price: prod.price,
                                    status: prod.status,
                                    id: prod.id,
                                    mode: 'update',
                                }}
                                onSubmit={() => closeProductsEditModal(prod.id)}
                            />
                        </MyModal>
                        <IonIcon
                            icon={trash}
                            className={styles.delIcon}
                            onClick={() => openDeleteConfirmation(prod.id)}
                        />

                        <p>{prod.id}</p>

                        <IonAlert
                            isOpen={showDeleteConfirmation}
                            onDidDismiss={closeDeleteConfirmation}
                            header="Confirm Deletion"
                            message="Are you sure you want to delete this product?"
                            buttons={[
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: closeDeleteConfirmation,
                                },
                                {
                                    text: 'Delete',
                                    handler: () => {
                                        if (productToDeleteId != null) {
                                            fetchDeleteProduct(
                                                productToDeleteId.toString()
                                            )
                                            setProductToDeleteId(null)
                                        }
                                        closeDeleteConfirmation()
                                    },
                                },
                            ]}
                        />
                    </IonCol>
                </IonRow>
            ))}
        </>
    )
}
