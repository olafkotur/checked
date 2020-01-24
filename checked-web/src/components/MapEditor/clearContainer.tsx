import React, { Component } from 'react';


import "./CSS/Editor.css"
import ZoneBlock from './ZoneBlock';
import ReactDOM from 'react-dom';

//@todo restrict this to ZoneBlock type


const ClearContainer = () => {
    return (
        <div className="blockContainer">
            <div onClick={clearZones} className="clearButton"> </div>

        </div>
    );
};



// functions

function clearZones() {
    console.log("button pressed");

    //const zones = document.getElementsByClassName("zoneBlock");
    const zones = document.getElementsByClassName("zoneBlock")
    const element = document.getElementById('blocksContainer');
    const elementParent = document.getElementById('mainEditor');

    console.log(zones)
    console.log(document.getElementsByClassName("zoneBlock"));

    if (element != null &&  elementParent != null) {
        if (zones != null) {
            console.log(zones.length)
                ReactDOM.unmountComponentAtNode(elementParent)
        }
    }
}



export default ClearContainer;