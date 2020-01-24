import React, { Component } from 'react';
import {clearZonesArr} from './BlockContainer'

import "./CSS/Editor.css"
import ReactDOM from 'react-dom';




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
    const elementParent = document.getElementById('mainEditor');

  

    if (elementParent != null && zones != null) {
        console.log(zones.length)
        ReactDOM.unmountComponentAtNode(elementParent)
        clearZonesArr()
    }
    
}



export default ClearContainer;