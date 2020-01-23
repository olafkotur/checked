import React from 'react';
import { Router } from "@reach/router";
import MenuBar from './components/MenuBar';
import MapEditor from './components/MapEditor';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Meme = (props: any): JSX.Element =>  {
	return (
		<div className="dashContainer">
			meme
		</div>
	);
};

const Meme2 = (props: any): JSX.Element => {
	return (
		<div className="dashContainer">
			Memes1
		</div>
	);
};

const Editor = (props: any): JSX.Element => {
	return (
		<div className="dashContainer">
			<MapEditor/>
		</div>
	);
};



const App: React.FC = () => {
  	return (
		<div>
			<MenuBar />
      		<Router>
        		<Meme path="/" />
				<Meme2 path="meme" />
				<Editor path="editor"/>
      		</Router>
    	</div>
  	);
};

export default App;
