// Routing Imports
import { Redirect, Route } from 'react-router-dom'
import {
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

//Image Imports
import {
    glassesOutline,
    hammerOutline,
    cartOutline,
    settingsOutline,
    logInOutline,
    logOutOutline,
} from 'ionicons/icons'

// Pages
import Landing from '../pages/Landing/Landing'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/Products/ProductDetails/ProductDetails'
import Cart from '../pages/Cart/Cart'
import Admin from '../pages/Admin/Admin'
import SuccessPage from '../pages/Payment/Success'
import FailurePage from '../pages/Payment/Failure'
import { logoutUser, isLoggedin, userAdmin } from '../util/api/auth/auth'
import { useState, useEffect } from 'react'

const Router: React.FC = () => {
    //Auth Check
    const [isAuthed, setIsAuthed] = useState(
        localStorage.getItem('isAuthed') === 'true'
    )
    const [isAdmin, setIsAdmin] = useState(Boolean)

    useEffect(() => {
        const storedIsAuthed = localStorage.getItem('isAuthed')
        if (storedIsAuthed) {
            setIsAuthed(storedIsAuthed === 'true')
        }

        async function checkUserAdmin() {
            const isAdminResponse = await userAdmin()
            setIsAdmin(isAdminResponse)
        }
        console.log(isAdmin, 'isAdmin')
        checkUserAdmin()
    }, [])

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    {/* Landing */}
                    <Route exact path="/landing" component={Landing} />
                    <Redirect exact from="/" to="/landing" />

                    {/* Success */}
                    <Route exact path="/success" component={SuccessPage} />

                    {/* Failure */}
                    <Route exact path="/failure" component={FailurePage} />

                    {/* Register */}
                    <Route exact path="/register" component={Register} />

                    {/* Login */}
                    <Route exact path="/login" component={Login} />

                    {/* Products */}
                    <Route exact path="/products" component={Products} />

                    {/* Product Details */}
                    <Route
                        exact
                        path="/products/:id"
                        component={ProductDetails}
                    />

                    {/* Cart */}
                    <Route exact path="/cart" component={Cart} />

                    {/* Admin */}
                    <Route
                        exact
                        path="/admin"
                        render={() => {
                            return isAuthed && isAdmin ? (
                                <Admin />
                            ) : (
                                <Redirect exact from="/" to="/landing" />
                            )
                        }}
                    />

                    {/* Fallback Route */}
                    <Route render={() => <Redirect to="/landing" />} />
                </IonRouterOutlet>

                <IonTabBar slot={window.orientation > 1 ? 'bottom' : 'top'}>
                    <IonTabButton tab="products" href="/products">
                        <IonIcon icon={glassesOutline} />
                        <IonLabel>Products</IonLabel>
                    </IonTabButton>
                    {isAuthed ? (
                        <IonTabButton tab="cart" href="/cart">
                            <IonIcon icon={cartOutline} />
                            <IonLabel>Cart</IonLabel>
                        </IonTabButton>
                    ) : (
                        ''
                    )}
                    {isAuthed && isAdmin ? (
                        <IonTabButton tab="admin" href="/admin">
                            <IonIcon icon={hammerOutline} />
                            <IonLabel>Admin</IonLabel>
                        </IonTabButton>
                    ) : (
                        ''
                    )}

                    {isAuthed ? (
                        //<IonTabButton tab="logout" onClick = {logoutUser} /href="/logout">
                        <IonTabButton tab="logout" onClick={logoutUser}>
                            <IonIcon icon={logOutOutline} />
                            <IonLabel>Logout</IonLabel>
                        </IonTabButton>
                    ) : (
                        <IonTabButton tab="login" href="/login">
                            <IonIcon icon={logInOutline} />
                            <IonLabel>Login</IonLabel>
                        </IonTabButton>
                    )}
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    )
}

export default Router
