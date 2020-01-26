
import React from 'react';
import Add from '@material-ui/icons/Add';
import "./CSS/Editor.css";
import ZoneBlock from './ZoneBlock';
import ReactDOM from 'react-dom';
import { ZoneService } from '../../api/ZoneService';

//@todo restrict this to ZoneBlock type
let zones: any[] = [];


function buildZone(DBZone: any): void {
    console.log(DBZone);

    const pos = {
        width: DBZone.width,
        height: DBZone.height,
        xValue: DBZone.xValue,
        yValue: DBZone.yValue + 125,
    };

    zones[zones.length] = <ZoneBlock key={(zones.length + 1).toString()} name={DBZone.name} id={(zones.length + 1)} dbid={DBZone.zoneId} pos = {pos}/>;
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





async function newZone(): Promise<void> {



    const dbid = await ZoneService.createZone((zones.length + 1).toString(), 100, 100, 0, 0, "rgb(255, 158, 0)");

    const pos = {
        width: 100,
        height: 100,
        xValue: 0,
        yValue: 125,
    };

    
    zones[zones.length] = <ZoneBlock key={(zones.length + 1).toString()} name={"Zone " + (zones.length + 1).toString()} id={(zones.length + 1)} dbid={dbid} pos = {pos}/>;
  


    ReactDOM.render(
        <div id="blocksContainer">
            {zones}
        </div>,
        document.getElementById('mainEditor')
    );


}

const BlockContainer = (): JSX.Element => {

    loadZones();

    return (
        <div className="blockContainer">
            <div onClick={newZone} className="zoneButton">
                <Add className="bigIcon" />
            </div>

        </div>
    );
};



// functions

export function clearZonesArr(): void {
    zones = [];
    console.log("Clearing zones array");
}







export default BlockContainer;