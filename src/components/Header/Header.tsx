import { PropsWithChildren } from 'react'
import styles from './Header.module.scss'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
} from '@ionic/react'
import { person, call, settings } from 'ionicons/icons'

const Header: React.FC<PropsWithChildren> = () => {
    return <IonHeader></IonHeader>
}

export default Header
