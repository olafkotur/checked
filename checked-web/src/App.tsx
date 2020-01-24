import React from 'react';
import { Router } from "@reach/router";
import { Login } from './pages/login';
import MenuBar from './components/MenuBar';

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
		console.log("AUTH STATE CHANGE", this.state.authorised);
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
				<div>
					<MenuBar />
					<Router>
						<Meme path='/' />
					</Router>
				</div>
			);
		} else {
			return (
				<div>
					<Login setAuthorised={this.setAuthorised} />
				</div>
			);
		}
	}

  	
};

export default App;
