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
import { IZone, ISettings } from './types';
import { Zone } from './pages/zone';
import { MemberUserView } from './pages/memberuser-view';
import { Settings } from './pages/settings';
import { SettingsService } from './api/SettingsService';


interface IState {
	darkTheme: boolean;
	zones: Array<IZone>;
	loaded: boolean;
	settings: ISettings;
}


class App extends React.Component<{}, IState> {

	constructor(props: any){
		
		
		const tempSettings: ISettings = {
			userId: -1,
			logoImage: '',
			darkMode: false,
			timeZone: 'en-GB',
			themeColor: '',
			notifications: {
				interval: 5,
				minTemperature: 15,
				maxTemperature: 25,
				gatheringThreshold: 0.7,
			},
		};


		super(props);
		this.state = { loaded: false, darkTheme: false, zones: [], settings: tempSettings}; // SET AUTH TO TRUE IF YOU DONT WANT TO LOG IN EVERYTIME
		this.setAuthorised = this.setAuthorised.bind(this);
		this.setDarkMode = this.setDarkMode.bind(this);
		this.setUserID = this.setUserID.bind(this);
		this.setGuardian = this.setGuardian.bind(this);
	}

	async componentDidMount(): Promise<void> {
		await this.getUserData();
	}

	async getUserData(): Promise<void> {
		await ZoneService.loadZonesByUser(Number(sessionStorage.getItem('userID'))).then((res) => {
			this.setState({
				zones: res.result,
			});
		}).catch(() => {
			console.error('Error loading Zone Data.');
		}).finally(async () => {
			await SettingsService.getUserSettings(Number(sessionStorage.getItem('userID'))).then((res2) => {
				this.setState({
					settings: res2.result,
					loaded: true
				});
			}).catch(() => {
				console.error('Error loading Settings Data.');
			});
		});
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
								<Settings path="settings" userID={userID} settings={this.state.settings}/>
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
								<Settings path="settings" userID={userID} settings={this.state.settings}/>
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
