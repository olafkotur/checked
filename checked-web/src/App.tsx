import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';
import MapEditor from './pages/map-editor';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

interface IState {
	authorised: boolean;
	userID: number;
}

class App extends React.Component<{}, IState> {

	constructor(props: any){
		super(props);
		this.state = { authorised: true, userID: 1 }; // SET THIS TO TRUE IF YOU DONT WANT TO LOG IN EVERYTIME
		this.setAuthorised = this.setAuthorised.bind(this);
	}

	setAuthorised(authState: boolean): void {
		this.setState({authorised: authState});
	};

	setUserID(userID: number): void {
		this.setState({ userID });
	};

	render(): JSX.Element {

		if (this.state.authorised) {
			return (
				<ThemeProvider theme={theme}>
					<MenuBar />
					<Router>
						<MapEditor path="editor" userID={this.state.userID}/>
					</Router>
				</ThemeProvider>
			);
		} else {
			return (
				<ThemeProvider theme={theme}>
					<Login setAuthorised={this.setAuthorised} setUserID={this.setUserID}/>
				</ThemeProvider>
			);
		}
	}
};

export default App;
