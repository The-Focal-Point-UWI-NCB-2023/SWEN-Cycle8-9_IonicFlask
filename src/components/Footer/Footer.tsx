import { PropsWithChildren } from 'react'
import styles from './Footer.module.scss'
import {IonFooter} from '@ionic/react'

const Footer: React.FC<PropsWithChildren> = (props) => {
    return (
        <IonFooter className={styles.footer}>
            <p>The Focal Point @ {(new Date()).getFullYear()}</p>
        </IonFooter>
    )
}

export default Footer
