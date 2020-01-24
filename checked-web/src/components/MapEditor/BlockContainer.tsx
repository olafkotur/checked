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

export function clearZonesArr(){
    zones = []
    console.log("Clearing zones array")
}

function newZone() {
    console.log("button pressed");
    zones[zones.length] = <ZoneBlock name = {(zones.length + 1).toString()} />;
    //const zones =  document.getElementsByClassName("zoneBlock")


    ReactDOM.render(
        <div id="blocksContainer">
            {zones}
        </div>,
        document.getElementById('mainEditor')
    )
    
}



export default BlockContainer;