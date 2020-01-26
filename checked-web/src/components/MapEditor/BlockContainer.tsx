import React from 'react';
import Add from '@material-ui/icons/Add'

import "./CSS/Editor.css"
import ZoneBlock from './ZoneBlock';
import ReactDOM from 'react-dom';

//@todo restrict this to ZoneBlock type
var zones: any[] = [];

const BlockContainer = () => {
    return (
        <div className="blockContainer">
            <div onClick={newZone} className="zoneButton">
                <Add className="bigIcon"/>
            </div>

        </div>
    );
};



// functions

export function clearZonesArr() {
    zones = []
    console.log("Clearing zones array")
}


function createID(){
    const endpoint = "/api/zones/create"
    var id = 7

    return id
}

function newZone() {
    console.log("button pressed");
    //zones[zones.length] = <ZoneBlock  key={(zones.length + 1).toString()} name={(zones.length + 1).toString()} id={(zones.length + 1)}  />;
    zones[zones.length] = <ZoneBlock key={(zones.length + 1).toString()} name={(zones.length + 1).toString()} id={(zones.length + 1)} />;
    //const zones =  document.getElementsByClassName("zoneBlock")


    ReactDOM.render(
        <div id="blocksContainer">
            {zones}
        </div>,
        document.getElementById('mainEditor')
    )

}



export default BlockContainer;