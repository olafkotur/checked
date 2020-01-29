import React from 'react';
import { Router } from "@reach/router";
import MenuBar from './components/MenuBar';

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
