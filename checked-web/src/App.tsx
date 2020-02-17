import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';
import MapEditor from './pages/map-editor';
import { Dashboard } from './pages/dashboard';
import { MemberManagement } from './pages/member-management';
import {DevPage} from './pages/devPage';

import { ThemeProvider } from '@material-ui/core/styles';
import {LightTheme, DarkTheme} from './muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

interface IState {
	authorised: boolean;
	userID: number;
	darkTheme: boolean;
}

class App extends React.Component<{}, IState> {

	constructor(props: any){
		super(props);
		this.state = { authorised: true, userID: 1, darkTheme: false }; // SET THIS TO TRUE IF YOU DONT WANT TO LOG IN EVERYTIME
		this.setAuthorised = this.setAuthorised.bind(this);
		this.setDarkMode = this.setDarkMode.bind(this);
		this.setUserID = this.setUserID.bind(this);
	}

	setAuthorised(authState: boolean): void {
		this.setState({authorised: authState});
	};

	setUserID(userID: number): void {
		this.setState({ userID });
	};

	setDarkMode(darkMode: boolean): void {
		this.setState({darkTheme: darkMode});
	}


	render(): JSX.Element {

		if (this.state.authorised) {
			if(this.state.darkTheme){
				return (
					<div className="backgroundDark">
						<ThemeProvider theme={DarkTheme}>
							<MenuBar setDarkMode={this.setDarkMode} />
							<Router>
								<MapEditor path="editor" userID={this.state.userID} />
								<Dashboard path="/" userID={this.state.userID} />
								<MemberManagement path="members" userID={this.state.userID} />
								<DevPage path="devPage" userID={this.state.userID}/>
							</Router>
						</ThemeProvider>
					</div>
				);
			} else {
				return (
					<div className="background">
						<ThemeProvider theme={LightTheme}>
							<MenuBar setDarkMode={this.setDarkMode} />
							<Router>
								<MapEditor path="editor" userID={this.state.userID} />
								<Dashboard path="/" userID={this.state.userID} />
								<MemberManagement path="members" userID={this.state.userID} />
								<DevPage path="devPage" userID={this.state.userID} />
							</Router>
						</ThemeProvider>
					</div>
				);
			}

		} else {
			return (
				<ThemeProvider theme={LightTheme}>
					<Login setAuthorised={this.setAuthorised} setUserID={this.setUserID}/>
				</ThemeProvider>
			);
		}
	}
};

export default App;
