import React from 'react';
import { Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from './Helpers/history';
import { PrivateRoute } from './Components';
import {
	HomePage,
	LoginPage,
	RegisterPage,
	SearchPage,
	ListPage
} from './Containers';

import './App.scss';

export class App extends React.Component {
	render() {
		return (
			<ConnectedRouter history={history}>
				<div className="App" id="app">
					<Router history={history}>
						<PrivateRoute exact path="/" component={HomePage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/search" component={SearchPage} />
						<Route path="/list" component={ListPage} />
					</Router>
				</div>
			</ConnectedRouter>
		);
	}
}

export default App;
