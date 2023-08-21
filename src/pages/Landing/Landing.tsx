import {
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonText,
    IonTitle,
} from '@ionic/react'
import styles from './Landing.module.scss'

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className={styles.container}>
                    <IonTitle>Focal Frames</IonTitle>
                    <IonImg
                        className={styles.img}
                        src="/thefocalpoints_Logo.jpg"
                    />
                    <IonText>
                        Welcome to Focal Frames, your premier destination for
                        stylish eyewear that blends fashion and function
                        seamlessly.
                    </IonText>
                    <IonText>
                        We believe that glasses are more than just a necessity –
                        they're a statement of your unique style and
                        personality.
                    </IonText>
                    <IonText>
                        We curate a diverse collection of frames that cater to
                        all tastes, whether you're looking for sophisticated
                        elegance or trendy chic.
                    </IonText>
                    <IonText>
                        Explore our handpicked selection and discover eyewear
                        that not only enhances your vision but also complements
                        your individuality.
                    </IonText>
                    <IonText>
                        Step into a world where clarity meets creativity, and
                        find the perfect frames to frame your world.
                    </IonText>
                    <IonText>- ChatGPT</IonText>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Home
