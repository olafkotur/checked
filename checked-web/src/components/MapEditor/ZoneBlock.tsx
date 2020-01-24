import React from 'react';
import './CSS/ZoneBlock.css'




const ZoneBlock = (props: any) => {

    // constructor(props: any) {
    //     super(props);
    // }

    return (
        <div className="zoneBlock" id={props.id} data-name={props.name}>
            {/* <h1 className="zoneTitle">Zone {props.name}</h1> */}

            <form onSubmit={e => { e.preventDefault(); }} className="zoneForm">
                <label className="zoneForm">
                    <input className="zoneTitle" type="text" name="name" placeholder={"Zone " + props.name} />
                </label>

            </form>


     

        </div>
    );

};

const changeName = () => {

    return
}

export default ZoneBlock;

// interact('.zoneBlock').draggable({
//     onmove(event) {
//         console.log(event.pageX,
//             event.pageY)
//     }
// })