import React, { useState } from 'react'
import {
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
} from '@ionic/react'
import { api_url_rest, getCsrfToken } from '../../util/constants'

const ProductForm = ({ initialValues, onSubmit }) => {
    const [productName, setProductName] = useState(initialValues.name || '')
    const [productDescription, setProductDescription] = useState(
        initialValues.description || ''
    )
    const [productPrice, setProductPrice] = useState(initialValues.price || '')
    const [productStatus, setProductStatus] = useState(
        initialValues.status || 'available'
    )
    const [mode, setMode] = useState(initialValues.mode)
    const [productID, setProductID] = useState(initialValues.id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const csrfToken = await getCsrfToken()
            const formData = new FormData()
            formData.append('name', productName)
            formData.append('description', productDescription)
            formData.append('price', productPrice)
            formData.append('status', productStatus)
            formData.append('user_id', '21')
            formData.append('image', document.getElementById('image').files[0])

            if (mode === 'create') {
                const jwt = localStorage.getItem('jwt')
                const response = await fetch(api_url_rest + 'products/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrfToken,
                        Authorization: `bearer ${jwt}`,
                    },
                    credentials: 'include',
                    mode: 'cors',
                    body: formData,
                })

                const data = await response.json()
                console.log('Created Product:', data)
                onSubmit()
            } else if (mode === 'update') {
                const jwt = localStorage.getItem('jwt')
                const response = await fetch(
                    api_url_rest + `products/${productID}`,
                    {
                        method: 'PUT',
                        headers: {
                            'X-CSRFToken': csrfToken,
                            Authorization: `bearer ${jwt}`,
                        },
                        credentials: 'include',
                        mode: 'cors',
                        body: formData,
                    }
                )

                const data = await response.json()
                console.log('Updated product successfully')
                onSubmit()
            }
            // Handle success
        } catch (error) {
            console.error('Error creating product:', error)
            // Handle error
        }
    }

    return (
        <form id="form" action="#" method="post" encType="multipart/form-data">
            <IonList>
                <IonItem>
                    <IonInput
                        label="Name"
                        name="name"
                        value={productName}
                        placeholder="e.g. A Pink Chair"
                        onIonChange={(e) => setProductName(e.detail.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonInput
                        label="Description"
                        name="description"
                        value={productDescription}
                        placeholder="Enter product description"
                        onIonChange={(e) =>
                            setProductDescription(e.detail.value)
                        }
                    />
                </IonItem>
                <IonItem>
                    <IonInput
                        type="number"
                        label="Price"
                        name="price"
                        value={productPrice}
                        placeholder="Enter product price"
                        onIonChange={(e) => setProductPrice(e.detail.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonSelect
                        value={productStatus}
                        placeholder="Select product status"
                        onIonChange={(e) => setProductStatus(e.detail.value)}
                    >
                        <IonSelectOption value="available">
                            Available
                        </IonSelectOption>
                        <IonSelectOption value="out_of_stock">
                            Out of Stock
                        </IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <label htmlFor="image">Image</label>
                    <input id="image" name="image" type="file" />
                </IonItem>
                <IonItem>
                    <input type="hidden" name="user_id" value="21" />
                    <IonButton color="primary" onClick={handleSubmit}>
                        Save
                    </IonButton>
                </IonItem>
            </IonList>
        </form>
    )
}

export default ProductForm
