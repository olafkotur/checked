import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';
import MapEditor from './pages/map-editor';
import { Dashboard } from './pages/dashboard';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

interface IState {
	authorised: boolean;
}

class App extends React.Component<{}, IState> {

	constructor(props: any){
		super(props);
		this.state = { authorised: true }; // SET THIS TO TRUE IF YOU DONT WANT TO LOG IN EVERYTIME
		this.setAuthorised = this.setAuthorised.bind(this);
	}

	setAuthorised(authState: boolean): void {
		this.setState({authorised: authState});
		return;
	};

	render(): JSX.Element {

		if (this.state.authorised) {
			return (
				<div className="background">
					<ThemeProvider theme={theme}>
						<MenuBar />
						<Router>
							<MapEditor path="editor"/>
							<Dashboard path="/" />
						</Router>
					</ThemeProvider>
				</div>

			);
		} else {
			return (
				<ThemeProvider theme={theme}>
					<Login setAuthorised={this.setAuthorised} />
				</ThemeProvider>
			);
		}
	}
};

export default App;
