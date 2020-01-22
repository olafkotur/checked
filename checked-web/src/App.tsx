import React from 'react';
import { Router, Link } from "@reach/router";

import MenuBar from './components/MenuBar';

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
			2
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
      		</Router>
    	</div>
  	);
};

export default App;
