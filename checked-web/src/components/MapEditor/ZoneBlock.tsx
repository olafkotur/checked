import React from 'react';
import './CSS/ZoneBlock.css'




const ZoneBlock = (props:any) => {

    // constructor(props: any) {
    //     super(props);
    // }

    return (
        <div className="zoneBlock">
            <h1 className="zoneTitle">Zone {props.name}</h1>
        </div>
    );

};

export default ZoneBlock;

// interact('.zoneBlock').draggable({
//     onmove(event) {
//         console.log(event.pageX,
//             event.pageY)
//     }
// })