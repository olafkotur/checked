import React, { Component } from 'react';


import "./CSS/Editor.css"
import ZoneBlock from './ZoneBlock';
import ReactDOM from 'react-dom';

//@todo restrict this to ZoneBlock type
var zones: any[] = [];

const BlockContainer = () => {
    return (
        <div className = "blockContainer">
            <div onClick={newZone} className = "zoneButton"> </div>
            
        </div>
    );
};



// functions

function newZone() {
    console.log("button pressed");
    zones[zones.length] = <ZoneBlock />;

    ReactDOM.render(
        <div id="blocksContainer">
            {zones}
        </div>,
        document.getElementById('mainEditor')
    )
}



export default BlockContainer;