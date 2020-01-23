import React from 'react';
import "./CSS/Editor.css"
import BlockContainer from './BlockContainer';
import ClearContainer from './clearContainer';


const SideMenu = () => {
    return (
        <div className="sideMenu">
            
            <BlockContainer />
            <ClearContainer />
        </div>
    );
};

export default SideMenu;