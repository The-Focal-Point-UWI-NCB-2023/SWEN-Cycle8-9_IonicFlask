import React from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { happyOutline } from 'ionicons/icons';
import styles from './Success.module.scss';

const SuccessPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className={styles.successPage}>
          <IonIcon icon={happyOutline} className={styles.smileyFace} />
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment. Your transaction was successful.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SuccessPage;
