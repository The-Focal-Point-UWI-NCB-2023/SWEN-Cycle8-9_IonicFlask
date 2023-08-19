// Routing Imports
import { Redirect, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

// Pages
import Landing from '../pages/Landing/Landing'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/Products/ProductDetails/ProductDetails'
import Admin from '../pages/Admin/Admin'
import Settings from '../pages/Settings/Settings'

const Router: React.FC = () => {
    //Auth Check
    const isAuthed = true

    return (
        <IonReactRouter>
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
                <Route exact path="/products/:id" component={ProductDetails} />

                {/* Admin */}
                <Route
                    exact
                    path="/admin"
                    render={() => {
                        return isAuthed ? (
                            <Admin />
                        ) : (
                            <Redirect exact from="/" to="/landing" />
                        )
                    }}
                />

                {/* Settings */}
                <Route exact path="/settings" component={Settings} />

                {/* Fallback Route */}
                <Route render={() => <Redirect to="/landing" />} />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default Router
