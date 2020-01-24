import React from 'react';


import "./CSS/Editor.css"

import { Save } from '@material-ui/icons';


const SaveContainer = () => {
    return (
        <div className="blockContainer">
            <div onClick={save} className="saveButton">
                <Save className="bigIcon"/>
            </div>

        </div>
    );
};

function save(){
    console.log("saving now")

    const zones = document.getElementsByClassName("zoneBlock")
    let toSend = []

    for (let i = 0; i < zones.length; i++) {
        const zone = zones[i];
        
        const rect = zone.getBoundingClientRect();
        const backgroundStyle = window.getComputedStyle(zone, null).getPropertyValue("background-color");
        // const label = document.getElementById("Zone"+zone.getAttribute('data-name')+"Label");
        // if (label != null) {
        //     console.log(label)
        // }
        
        const zoneJson = {
            id: zone.id,
            name: zone.getAttribute('data-name'),
            width: rect.width,
            height: rect.height,
            x: rect.x,
            y: rect.y,
            color: backgroundStyle,
        };
        console.log(zoneJson)

    }

    //console.log(zones.length)
}

export default SaveContainer;