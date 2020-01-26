
import React from 'react';
import Add from '@material-ui/icons/Add';
import "./CSS/Editor.css";
import ZoneBlock from './ZoneBlock';
import ReactDOM from 'react-dom';
import { ZoneService } from '../../api/ZoneService';

//@todo restrict this to ZoneBlock type
let zones: any[] = [];






async function newZone(): Promise<void> {
    const dbid = await ZoneService.createZone((zones.length + 1).toString(), 100, 100, 0, 0, "rgb(255, 158, 0)");
   
    //zones[zones.length] = <ZoneBlock  key={(zones.length + 1).toString()} name={(zones.length + 1).toString()} id={(zones.length + 1)}  />;
    zones[zones.length] = <ZoneBlock key={(zones.length + 1).toString()} name={(zones.length + 1).toString()} id={(zones.length + 1)} dbid = {dbid} />;
    //const zones =  document.getElementsByClassName("zoneBlock")
    

    ReactDOM.render(
        <div id="blocksContainer">
            {zones}
        </div>,
        document.getElementById('mainEditor')
    );
   

}

const BlockContainer = (): JSX.Element => {
    return (
        <div className="blockContainer">
            <div onClick={newZone} className="zoneButton">
                <Add className="bigIcon"/>
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