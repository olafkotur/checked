import React from 'react';
// import ZoneBlock from './MapEditor/ZoneBlock'

import EditorContainer from '../../components/MapEditor/EditorContainer';
import BackgroundGrid from '../../components/MapEditor/BackgroundGrid';
import { RouteComponentProps } from '@reach/router';
import { Card, CardHeader, CardContent, Typography, Avatar, Button, IconButton, Divider } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import "../../components/MapEditor/CSS/EditorCard.css";
import { Add, GridOn, Delete, ColorLens, Save } from '@material-ui/icons';
import MainEditor from '../../components/MapEditor/MainEditor';
import ZoneBlock from '../../components/MapEditor/ZoneBlock';
import { ZoneService } from '../../api/ZoneService';
import ReactDOM from 'react-dom';
import '../../components/MapEditor/InteractJS/DragZone.js';
import checkCollision from '../../components/MapEditor/collisionDetection';



let zones: any[] = [];

async function newZone(): Promise<void> {
    const dbid = await ZoneService.createZone((zones.length + 1).toString(), 100, 100, 0, 0, "rgb(255, 158, 0)");
    const pos = {
        width: 100,
        height: 100,
        xValue: 0,
        yValue: 0,
    };
    zones[zones.length] = <ZoneBlock key={(zones.length + 1).toString()} name={"Zone " + (zones.length + 1).toString()} id={(zones.length + 1)} dbid={dbid} pos={pos} />;
    ReactDOM.render(
        <div id="blocksContainer">
            {zones}
        </div>,
        document.getElementById('mainEditor')
    );
}

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
                xValue: rect.x - 75,
                yValue: rect.y - 200,
                color: backgroundStyle,
            };
            console.log(rect.x);
            // it should always not be null
            if (id != null) {
                await ZoneService.updateZone(zoneJson, parseInt(id));
            }

        }
    }
    else {
        alert("zones cannot intersect, your work has NOT been saved");
    }
}

function clearZonesArr(): void {
    zones = [];
    console.log("Clearing zones array");
}

function clearZones(): void {
    console.log("button pressed");

    //const zones = document.getElementsByClassName("zoneBlock");
    const zones = document.getElementsByClassName("zoneBlock");
    const elementParent = document.getElementById('mainEditor');



    if (elementParent != null && zones != null) {
        console.log(zones.length);
        ReactDOM.unmountComponentAtNode(elementParent);
        clearZonesArr();
    }

}



function buildZone(DBZone: any): void {
    console.log(DBZone);

    const pos = {
        width: DBZone.width,
        height: DBZone.height,
        xValue: DBZone.xValue,
        yValue: DBZone.yValue,
    };

    zones[zones.length] = <ZoneBlock key={(zones.length + 1).toString()} name={DBZone.name} id={(zones.length + 1)} dbid={DBZone.zoneId} pos={pos} />;
}

async function loadZones(): Promise<void> {

    const response = await ZoneService.loadZones();
    console.log(response.result.length);

    for (let i = 0; i < response.result.length; i++) {
        buildZone(response.result[i]);

    }

    ReactDOM.render(
        <div id="blocksContainer">
            {zones}
        </div>,
        document.getElementById('mainEditor')
    );

}

class MapEditor extends React.Component<RouteComponentProps, {}> {

    
    
    render(): JSX.Element {

        loadZones();


        return (
            <Card className="editorCard" id="editorCard">
                <CardHeader title="Room Layout Editor" avatar={<GridOn />}>

                </CardHeader>

                <Divider />

                <Toolbar >
                    <IconButton onClick={() => { newZone();}}aria-label="Add new zone">
                        <Add />
                    </IconButton>

                    <IconButton aria-label="Add new zone">
                        <ColorLens />
                    </IconButton>

                    <Divider orientation="vertical" variant="middle"  />

                    <IconButton onClick={() => { clearZones(); }} aria-label="Add new zone">
                        <Delete />
                    </IconButton>


                    <IconButton onClick={() => { save(); }} aria-label="Add new zone">
                        <Save />
                    </IconButton>
                </Toolbar> 
                <Divider />
                <CardContent className="editorContent"> 
                   
                    <BackgroundGrid />
                    <MainEditor />
                        
                </CardContent>
                
                {/* <EditorContainer />
                <BackgroundGrid /> */}
            </Card>
        );
    }
};


export default MapEditor;
