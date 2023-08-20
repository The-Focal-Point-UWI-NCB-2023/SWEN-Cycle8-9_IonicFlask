import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import styles from './Landing.module.scss'

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <h1>The Focal Frames</h1>
            </IonContent>
        </IonPage>
    )
}

export default Home
