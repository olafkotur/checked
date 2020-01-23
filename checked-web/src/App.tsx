import React from 'react';
import { Router } from "@reach/router";
import MenuBar from './components/MenuBar';

import { UserService } from './api/UserService';

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

UserService.createUser('meme', 'meme').then((bidMeme) => {
	console.log(bidMeme);
}).catch((meme: boolean) => {
	console.log(meme);
});

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
