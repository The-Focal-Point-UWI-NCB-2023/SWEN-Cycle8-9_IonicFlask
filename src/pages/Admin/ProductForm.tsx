import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

interface ProductFormProps {
  initialProduct: {
    image: string;
    title: string;
    description: string;
    price: number;
  };
  onSubmit: (updatedProduct: {
    image: string;
    title: string;
    description: string;
    price: number;
  }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmit }) => {
  const [product, setProduct] = useState(initialProduct);
 
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(product);
  };

  return (
    <form  className=''onSubmit={handleSubmit}>
      <IonItem>
        <IonLabel position="stacked">Upload Image</IonLabel>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Title</IonLabel>
        <IonInput
          name="title"
          value={product.title}
          onIonChange={() => handleInputChange}
          required
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Description</IonLabel>
        <IonInput
          name="description"
          value={product.description}
          onIonChange={() =>handleInputChange}
          required
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Price</IonLabel>
        <IonInput
          name="price"
          type="number"
          value={product.price.toString()}
          onIonChange={() => handleInputChange}
          required
        />
      </IonItem>
      <IonButton expand="full" type="submit">
        Save Changes
      </IonButton>
    </form>
  );
};

export default ProductForm;
