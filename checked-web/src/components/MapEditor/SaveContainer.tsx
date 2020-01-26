
import React from 'react';


import "./CSS/Editor.css";

import { Save } from '@material-ui/icons';

// this import is reused from 330
import checkCollision from './collisionDetection';
import { ZoneService } from '../../api/ZoneService';




async function save(): Promise<void> {
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
            const id = zone.getAttribute('data-dbid');
            // Create Json
            const zoneJson = {
                name: zone.id,
                width: rect.width,
                height: rect.height,
                x: rect.x,
                y: rect.y,
                color: backgroundStyle,
            };
            
            if(id != null){
             await ZoneService.saveZone(zoneJson,parseInt(id));
            }
        }
    }
    else {
        alert("zones cannot intersect");
    }
}























const SaveContainer = (): JSX.Element => {
    return (
        <div className="blockContainer">
            <div onClick={save} className="saveButton">
                <Save className="bigIcon" />
            </div>

        </div>
    );
};


export default SaveContainer;