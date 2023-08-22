import React, { useState } from 'react'
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react'
import { title } from 'process'
import { event } from 'cypress/types/jquery'
import { createProduct } from '../../util/api/models/products' // Import the function
import { type } from 'os'

interface ProductFormProps {
    initialProduct: {
        image: string
        title: string
        description: string
        price: number
    }

    onSubmit: (updatedProduct: {
        image: string
        title: string
        description: string
        price: number
    }) => void
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialProduct,
    onSubmit,
}) => {
    const [product, setProduct] = useState<Product>(initialProduct)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }))
        console.log('change')
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        // console.log("submit")
        onSubmit(product)

        // let prod = document.getElementById('product');
        // let form_data = new FormData(prod);

        // const formData = new FormData();
        // formData.append('image', selectedImage || '');
        // formData.append('name', product.title);
        // formData.append('description', product.description);
        // formData.append('price', product.price.toString());

        // async function createProducts() {
        //     try {
        //         const product = await createProduct()
        //         createProduct(product)
        //     } catch (error) {
        //         console.error('Error fetching products:', error)
        //     }
    }

    return (
        <form id="product" onSubmit={handleSubmit(onSubmit)}>
            <IonItem>
                <IonLabel position="stacked">Upload Image</IonLabel>
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onIonChange={handleImageChange}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                    name="name"
                    value={product.name}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonInput
                    name="description"
                    value={product.description}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Price</IonLabel>
                <IonInput
                    name="price"
                    type="number"
                    value={product.price.toString()}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Product ID</IonLabel>
                <IonInput
                    name="id"
                    type="number"
                    value={product.id.toString()}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">User ID</IonLabel>
                <IonInput
                    name="user_id"
                    type="number"
                    value={product.user_id.toString()}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Status</IonLabel>
                <IonInput
                    name="status"
                    type="string"
                    value={product.status}
                    onIonChange={handleInputChange}
                    required
                />
            </IonItem>
            <IonButton expand="full" type="submit">
                Save Changes
            </IonButton>
        </form>
    )
}

export default ProductForm
