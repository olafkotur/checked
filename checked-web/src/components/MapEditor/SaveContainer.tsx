/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';


import "./CSS/Editor.css";

import { Save } from '@material-ui/icons';

// this import is reused from 330
import checkCollision from './collisionDetection';




function save(): void {
    console.log("saving now");

    const zones = document.getElementsByClassName("zoneBlock");
    const toSend = [];

    // checks if the zones are not overlapping (reused from 330)
    if (checkCollision(zones) === false) { 

        for (let i = 0; i < zones.length; i++) {
            // Uses HTML Div
            const zone = zones[i];
            const rect = zone.getBoundingClientRect();
            const backgroundStyle = window.getComputedStyle(zone, null).getPropertyValue("background-color");
           
            // Create Json
            const zoneJson = {
                id: zone.getAttribute('data-dbid'),
                name: zone.id,
                width: rect.width,
                height: rect.height,
                x: rect.x,
                y: rect.y,
                color: backgroundStyle,
            };
            toSend[toSend.length] = zoneJson;
            
        }
        console.log(toSend);
        const requestData = '{"data" : ' + JSON.stringify(toSend) + '}';
        console.log(requestData);
    }
    else {
        alert("zones cannot intersect");
    }
    //console.log(zones.length)
}


const SaveContainer = () => {
    return (
        <div className="blockContainer">
            <div onClick={save} className="saveButton">
                <Save className="bigIcon" />
            </div>

        </div>
    );
};


export default SaveContainer;