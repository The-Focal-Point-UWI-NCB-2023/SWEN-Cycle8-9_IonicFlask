import { PropsWithChildren } from 'react'
import styles from './Main.module.scss'
import { IonPage, IonContent } from '@ionic/react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Main: React.FC<PropsWithChildren> = (props) => {
    return (
        <IonPage>
            <Header />

            <IonContent fullscreen>
                <main className={styles.main}>{props.children}</main>
            </IonContent>

            <Footer />
        </IonPage>
    )
}

export default Main
