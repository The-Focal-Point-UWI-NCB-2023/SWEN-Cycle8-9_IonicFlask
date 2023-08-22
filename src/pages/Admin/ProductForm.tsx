import React, { useState } from 'react'
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react'
import { Product, updateProduct } from '../../util/api/models/products'

interface ProductFormProps {
    initialProduct: Product
    onSubmit: (updatedProduct: Product) => void
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
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const updatedProduct: Product = {
                id: product.id, // Include the product ID
                name: product.name,
                description: product.description,
                price: product.price,
                image: selectedImage ? selectedImage.name : '', // Include the image name or an empty string
                status: product.status,
                user_id: product.user_id,
            }

            // Call the updateProduct function
            const updatedProductResponse = await updateProduct(
                product.id.toString(),
                updatedProduct
            )

            // Call onSubmit with the updated product data
            onSubmit(updatedProductResponse)
        } catch (error) {
            console.error('Error updating product:', error)
        }
    }

    return (
        <form className="" onSubmit={handleSubmit}>
            <IonItem>
                <IonLabel position="stacked">Upload Image</IonLabel>
                <IonInput
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
