import React from 'react';
import { IonModal } from '@ionic/react';

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      {children}
    </IonModal>
  );
};

export default MyModal;
