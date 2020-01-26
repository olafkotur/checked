import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';
import MapEditor from './components/MapEditor';

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
		return;
	};

	render(): JSX.Element {



		if (this.state.authorised) {
			return (
				<ThemeProvider theme={theme}>
					<MenuBar />
					<Router>
						<Meme path='/' />
            <Editor path="editor"/>
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
