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

const Router: React.FC = () => {
    //Auth Check
    const isAuthed = true
    const isAdmin = true

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    {/* Landing */}
                    <Route exact path="/landing" component={Landing} />
                    <Redirect exact from="/" to="/landing" />

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

                    <IonTabButton tab="cart" href="/cart">
                        <IonIcon icon={cartOutline} />
                        <IonLabel>Cart</IonLabel>
                    </IonTabButton>

                    {isAuthed && isAdmin ? (
                        <IonTabButton tab="admin" href="/admin">
                            <IonIcon icon={hammerOutline} />
                            <IonLabel>Admin</IonLabel>
                        </IonTabButton>
                    ) : (
                        ''
                    )}

                    {isAuthed ? (
                        <IonTabButton tab="logout" href="/logout">
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
