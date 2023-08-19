import { PropsWithChildren } from 'react'
import styles from './Header.module.scss'
import {IonHeader, IonToolbar, IonTitle } from '@ionic/react'

const Header: React.FC<PropsWithChildren> = (props) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>Focal Frames</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header
