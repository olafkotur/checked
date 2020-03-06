import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';
import MapEditor from './pages/map-editor';
import { Dashboard } from './pages/dashboard';
import { MemberManagement } from './pages/member-management';
import { OverseerView } from './pages/overseer-view';
import {ZoneService} from './api/ZoneService';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
		this.updateUserSettings = this.updateUserSettings.bind(this);
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
					settings: res2.result as ISettings,
					loaded: true
				});
			}).catch(() => {
				console.error('Error loading Settings Data.');
			});
		});
	}

	updateUserSettings(settings: ISettings): void {
		SettingsService.setUserSettings(Number(sessionStorage.getItem('userID')), settings as ISettings).then(() => {
			this.setState({settings});
		}).catch(() => {
			console.error('Error saving user settings.');
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

	getDarkTheme(primary: string): Record<string, any> {
		return createMuiTheme({
			palette: {
				type: 'dark',
				primary: {
					main: primary.toString(),
					contrastText: '#ffffff',
				},
				error: {
					main: '#f44336',
				},
				warning: {
					main: '#ff9800'
				},
				success: {
					main: '#4caf50'
				},
				info: {
					main: '#2196f3'
				}
			},
			typography: {
				button: {
					fontFamily: 'Montserrat, sans-serif',
					fontWeight: 600,
					letterSpacing: '0.1em',
					textTransform: 'none'
				},
			},
			overrides: {
				MuiCardHeader: {
					title: {
						fontFamily: 'Montserrat, sans-serif',
						fontWeight: 700,
						letterSpacing: '0.1em',
						fontSize: '140%',
					},
					avatar: {
						marginLeft: '10px',
						width: '30px',
						height: '30px',
					}
				},
			}
		});
	}

	getLightTheme(primary: string): Record<string, any> {
		return createMuiTheme({
			palette: {
				type: 'light',
				primary: {
					main: primary.toString(),
					contrastText: '#ffffff',
				},
				error: {
					main: '#f44336',
				},
				warning: {
					main: '#ff9800'
				},
				success: {
					main: '#4caf50'
				},
				info: {
					main: '#2196f3'
				}
			},
			typography: {
				button: {
					fontFamily: 'Montserrat, sans-serif',
					fontWeight: 600,
					letterSpacing: '0.1em',
					textTransform: 'none'
				},
			},
			overrides: {
				MuiCardHeader: {
					title: {
						fontFamily: 'Montserrat, sans-serif',
						fontWeight: 700,
						letterSpacing: '0.1em',
						fontSize: '140%',
					},
					avatar: {
						marginLeft: '10px',
						width: '30px',
						height: '30px',
					}
				},
			}
		});
	}


	render(): JSX.Element {

		const darkTheme = this.getDarkTheme(this.state.settings.themeColor || '#FF9E00');
		const lightTheme = this.getLightTheme(this.state.settings.themeColor || '#FF9E00');


		if (sessionStorage.getItem('authorised') === 'true') {

			const userID = Number(sessionStorage.getItem('userID'));


			if (sessionStorage.getItem('guardian') === 'true') {
				if(this.state.settings.darkMode){
					return (
						<div className="backgroundDark">
							<ThemeProvider theme={darkTheme}>
								<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID} menuHidden logo={this.state.settings.logoImage}/>
								<OverseerView userID={userID} />
								
							</ThemeProvider>
						</div>
					);
				} else {
					return (
						<div className="background">
							<ThemeProvider theme={lightTheme}>
								<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID} menuHidden logo={this.state.settings.logoImage}/>
								<OverseerView userID={userID}/>
							</ThemeProvider>
						</div>
					);
				}
			} 

			if (this.state.settings.darkMode && this.state.loaded){
				return (
					<div className="backgroundDark">
						<ThemeProvider theme={darkTheme}>
							<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID} logo={this.state.settings.logoImage}/>
							<Router>
								<MapEditor path="editor" userID={userID} />
								<Dashboard path="/" userID={userID} />
								<MemberManagement path="members" userID={userID} />
								<MemberUserView path = "memberuser"userID={userID} />
								<Settings path="settings" userID={userID} settings={this.state.settings} saveSettings={this.updateUserSettings}/>
								{this.renderZoneRoutes()}
							</Router>
						</ThemeProvider>
					</div>
				);
			} else if(this.state.loaded) {
				return (
					<div className="background">
						<ThemeProvider theme={lightTheme}>
							<MenuBar setAuthorised={this.setAuthorised} zones={this.state.zones} userID={userID} logo={this.state.settings.logoImage}/>
							<Router>
								<MapEditor path="editor" userID={userID} />
								<Dashboard path="/" userID={userID} />
								<MemberManagement path="members" userID={userID} />
								<MemberUserView path="memberuser" userID={userID} />
								<Settings path="settings" userID={userID} settings={this.state.settings} saveSettings={this.updateUserSettings}/>
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
				<ThemeProvider theme={lightTheme}>
					<Login setAuthorised={this.setAuthorised} setUserID={this.setUserID} setGuardian={this.setGuardian}/>
				</ThemeProvider>
			);
		}
	}
};

export default App;
