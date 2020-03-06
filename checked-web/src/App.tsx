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
import { Settings } from './pages/settings';


interface IState {
	darkTheme: boolean;
	zones: Array<IZone>;
	loaded: boolean;
}


class App extends React.Component<{}, IState> {

	constructor(props: any){
		super(props);
		this.state = { loaded: false, darkTheme: false, zones: []}; // SET AUTH TO TRUE IF YOU DONT WANT TO LOG IN EVERYTIME
		this.setAuthorised = this.setAuthorised.bind(this);
		this.setDarkMode = this.setDarkMode.bind(this);
		this.setUserID = this.setUserID.bind(this);
		this.setGuardian = this.setGuardian.bind(this);
	}

	componentDidMount(): void {
		this.getZones();
	}

	setAuthorised(authState: boolean): void {
		sessionStorage.setItem('authorised', authState.toString());
		window.location.reload();
	};

	setUserID(userID: number): void {
		sessionStorage.setItem('userID', userID.toString());
	};

	setDarkMode(darkMode: boolean): void {
		this.setState({darkTheme: darkMode});
	}

	setGuardian(isGuardian: boolean): void {
		sessionStorage.setItem('guardian', isGuardian.toString());
	}

	getZones(): void {
		ZoneService.loadZonesByUser(Number(sessionStorage.getItem('userID'))).then((res) => {
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
				<Zone userID={Number(sessionStorage.getItem('userID'))} zoneDetails={zone} path={zone.zoneId.toString()} key={zone.zoneId}/>
			);
		});
		return renderedZoneRoutes;
	}


	render(): JSX.Element {

		if (sessionStorage.getItem('authorised') === 'true') {

			const userID = Number(sessionStorage.getItem('userID'));


			if (sessionStorage.getItem('guardian') === 'true') {
				if(this.state.darkTheme){
					return (
						<div className="backgroundDark">
							<ThemeProvider theme={DarkTheme}>
								<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID} menuHidden/>
								<OverseerView userID={userID} />
								
							</ThemeProvider>
						</div>
					);
				} else {
					return (
						<div className="background">
							<ThemeProvider theme={LightTheme}>
								<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID} menuHidden/>
								<OverseerView userID={userID}/>
							</ThemeProvider>
						</div>
					);
				}
			} 

			if(this.state.darkTheme && this.state.loaded){
				return (
					<div className="backgroundDark">
						<ThemeProvider theme={DarkTheme}>
							<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID}/>
							<Router>
								<MapEditor path="editor" userID={userID} />
								<Dashboard path="/" userID={userID} />
								<MemberManagement path="members" userID={userID} />
								<MemberUserView path = "memberuser"userID={userID} />
								<Settings path="settings" userID={userID} />
								{this.renderZoneRoutes()}
							</Router>
						</ThemeProvider>
					</div>
				);
			} else if(this.state.loaded) {
				return (
					<div className="background">
						<ThemeProvider theme={LightTheme}>
							<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID}/>
							<Router>
								<MapEditor path="editor" userID={userID} />
								<Dashboard path="/" userID={userID} />
								<MemberManagement path="members" userID={userID} />
								<MemberUserView path="memberuser" userID={userID} />
								<Settings path="settings" userID={userID} />
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
