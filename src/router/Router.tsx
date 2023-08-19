// Routing Imports
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Components
import Landing from '../pages/Landing/Landing';

const Router: React.FC = () => {
	return (
		<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path="/">
					<Landing />
				</Route>
			</IonRouterOutlet>
		</IonReactRouter>
	)
}

export default Router