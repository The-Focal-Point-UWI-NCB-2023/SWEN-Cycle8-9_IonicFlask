import { useState, useEffect } from 'react'
import {
    IonListHeader,
    IonList,
    IonItem,
    IonToggle,
    ToggleCustomEvent,
} from '@ionic/react'
import Main from '../../components/Main/Main'
import styles from './Settings.module.scss'

const Settings: React.FC = () => {
    const [themeToggle, setThemeToggle] = useState(false)

    // Listen for the toggle check/uncheck to toggle the dark theme
    const toggleChange = (ev: ToggleCustomEvent) => {
        toggleDarkTheme(ev.detail.checked)
    }

    // Add or remove the "dark" class on the document body
    const toggleDarkTheme = (shouldAdd: boolean) => {
        document.body.classList.toggle('dark', shouldAdd)
    }

    // Check/uncheck the toggle and update the theme based on isDark
    const initializeDarkTheme = (isDark: boolean) => {
        setThemeToggle(isDark)
        toggleDarkTheme(isDark)
    }

    useEffect(() => {
        // Use matchMedia to check the user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

        // Initialize the dark theme based on the initial
        // value of the prefers-color-scheme media query
        initializeDarkTheme(prefersDark.matches)

        // Listen for changes to the prefers-color-scheme media query
        prefersDark.addEventListener('change', (mediaQuery) =>
            initializeDarkTheme(mediaQuery.matches)
        )
    }, [])

    return (
        <Main>
            <h2>Settings Page</h2>
            <IonListHeader>Appearance</IonListHeader>
            <IonList inset={true}>
                <IonItem>
                    <IonToggle checked={themeToggle} onIonChange={toggleChange}>
                        Dark Mode
                    </IonToggle>
                </IonItem>
            </IonList>
        </Main>
    )
}

export default Settings
