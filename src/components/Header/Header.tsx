import { PropsWithChildren } from 'react'
import styles from './Header.module.scss'
import { IonHeader } from '@ionic/react'

const Header: React.FC<PropsWithChildren> = () => {
    return <IonHeader></IonHeader>
}

export default Header
