import React from 'react'
import { IonContent, IonPage, IonIcon } from '@ionic/react'
import { sadOutline } from 'ionicons/icons'
import styles from './Failure.module.scss'

const FailurePage: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div className={styles.failurePage}>
                    <IonIcon icon={sadOutline} className={styles.frownIcon} />
                    <h1>Payment Failed</h1>
                    <p>Sorry, your payment was not successful.</p>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default FailurePage
