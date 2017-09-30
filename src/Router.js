import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import EMTComponent from './components/EMTComponent';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="main">
				<Scene key="bus" component={EMTComponent} title="EMT" initial/>
			</Scene>
		</Router>
	);
};

export default RouterComponent;