import React from 'react';
import "./CSS/Editor.css"
import BlockContainer from './BlockContainer';
import ClearContainer from './clearContainer';
import SaveContainer from './SaveContainer';
import ColorPicker from './ColorPicker';

const SideMenu = () => {
    return (
        <div className="sideMenu">

            <BlockContainer />
            <ColorPicker />
            <ClearContainer />
            <SaveContainer />
           
            
         
        </div>
    );
};

export default SideMenu;