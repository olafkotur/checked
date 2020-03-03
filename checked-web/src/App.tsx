import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';
import MapEditor from './pages/map-editor';
import { Dashboard } from './pages/dashboard';
import { MemberManagement } from './pages/member-management';
import { OverseerView } from './pages/overseer-view';

import {ZoneService} from './api/ZoneService';

import { ThemeProvider } from '@material-ui/core/styles';
import {LightTheme, DarkTheme} from './muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { IZone } from './types';
import { Zone } from './pages/zone';
import { MemberUserView } from './pages/memberuser-view';


interface IState {
	authorised: boolean;
	userID: number;
	darkTheme: boolean;
	zones: Array<IZone>;
	loaded: boolean;
	guardian: boolean;
}


class App extends React.Component<{}, IState> {

	constructor(props: any){
		super(props);
		this.state = { authorised: false, userID: 1, guardian: false, loaded: false, darkTheme: false, zones: []}; // SET AUTH TO TRUE IF YOU DONT WANT TO LOG IN EVERYTIME
		this.setAuthorised = this.setAuthorised.bind(this);
		this.setDarkMode = this.setDarkMode.bind(this);
		this.setUserID = this.setUserID.bind(this);
		this.setGuardian = this.setGuardian.bind(this);
	}

	componentDidMount(): void {
		this.getZones();
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

	setGuardian(isGuardian: boolean): void {
		this.setState({guardian: isGuardian});
	}

	getZones(): void {
		ZoneService.loadZonesByUser(this.state.userID).then((res) => {
			this.setState({
				zones: res.result,
				loaded: true
			});
		}).catch(() => {
			console.error('Error loading Zone Data.');
		});
	}

	renderZoneRoutes(): Array<JSX.Element> {
		const renderedZoneRoutes: Array<JSX.Element> = [];

		this.state.zones.forEach((zone: IZone) => {
			renderedZoneRoutes.push(
				<Zone userID={this.state.userID} zoneDetails={zone} path={zone.zoneId.toString()} key={zone.zoneId}/>
			);
		});
		return renderedZoneRoutes;
	}


	render(): JSX.Element {

		if (this.state.authorised) {


			if (this.state.guardian) {
				if(this.state.darkTheme){
					return (
						<div className="backgroundDark">
							<ThemeProvider theme={DarkTheme}>
								<MenuBar setDarkMode={this.setDarkMode} zones={this.state.zones} userID={this.state.userID} menuHidden/>
								<OverseerView userID={this.state.userID} />
								
							</ThemeProvider>
						</div>
					);
				} else {
					return (
						<div className="background">
							<ThemeProvider theme={LightTheme}>
								<MenuBar setDarkMode={this.setDarkMode} zones={this.state.zones} userID={this.state.userID} menuHidden/>
								<OverseerView userID={this.state.userID}/>
							</ThemeProvider>
						</div>
					);
				}
			} 

			if(this.state.darkTheme && this.state.loaded){
				return (
					<div className="backgroundDark">
						<ThemeProvider theme={DarkTheme}>
							<MenuBar setDarkMode={this.setDarkMode} zones={this.state.zones} userID={this.state.userID}/>
							<Router>
								<MapEditor path="editor" userID={this.state.userID} />
								<Dashboard path="/" userID={this.state.userID} />
								<MemberManagement path="members" userID={this.state.userID} />
								<MemberUserView path = "memberuser"userID={this.state.userID} />
								
								{this.renderZoneRoutes()}
							</Router>
						</ThemeProvider>
					</div>
				);
			} else if(this.state.loaded) {
				return (
					<div className="background">
						<ThemeProvider theme={LightTheme}>
							<MenuBar setDarkMode={this.setDarkMode} zones={this.state.zones} userID={this.state.userID}/>
							<Router>
								<MapEditor path="editor" userID={this.state.userID} />
								<Dashboard path="/" userID={this.state.userID} />
								<MemberManagement path="members" userID={this.state.userID} />
								<MemberUserView path="memberuser" userID={this.state.userID} />
								
								{this.renderZoneRoutes()}
							</Router>
						</ThemeProvider>
					</div>
				);
			} else {
				return (
					<div></div>
				);
			}


		} else {
			return (
				<ThemeProvider theme={LightTheme}>
					<Login setAuthorised={this.setAuthorised} setUserID={this.setUserID} setGuardian={this.setGuardian}/>
				</ThemeProvider>
			);
		}
	}
};

export default App;
