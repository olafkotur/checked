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

let zones: any[] = [];


function clearZonesArr(): void {
    zones = [];
    console.log("Clearing zones array");
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
                    <IconButton aria-label="Add new zone">
                        <Add />
                    </IconButton>

                    <IconButton aria-label="Add new zone">
                        <ColorLens />
                    </IconButton>

                    <Divider orientation="vertical" variant="middle"  />

                    <IconButton aria-label="Add new zone">
                        <Delete />
                    </IconButton>


                    <IconButton aria-label="Add new zone">
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
