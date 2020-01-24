import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';

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
		this.state = { authorised: false };
		this.setAuthorised = this.setAuthorised.bind(this);
	}

	setAuthorised(authState: boolean): void {
		this.setState({authorised: authState});
		console.log(this.state.authorised);
		return;
	};

	render(): JSX.Element {

		const Meme = (props: any): JSX.Element => {
			return (
				<div className="dashContainer">
					meme
				</div>
			);
		};

		if (this.state.authorised) {
			return (
				<ThemeProvider theme={theme}>
					<MenuBar />
					<Router>
						<Meme path='/' />
					</Router>
				</ThemeProvider>
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
