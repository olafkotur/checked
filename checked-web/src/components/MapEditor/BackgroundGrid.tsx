import React from 'react';

import './CSS/background.css'
import BgColumn from './BgColumn';
import BgRow from './BgRow';

var col: any[] = [];
var row: any[] = [];

const BackgroundGrid = () => {
    genCol();
    genRow();
    return (
        <div className="BgContainer">
            <div className="colsDiv">
                {col}
            </div>
            <div className="colsDiv">
                {row}
            </div>
            
        </div>
    );
};

function genCol() {
    const loop = Math.floor(window.innerWidth / 25)
  
    for (let i = 0; i < loop; i++) {
        col[col.length] = <BgColumn/>
        
    }
}

function genRow() {
    const loop = Math.floor(window.innerHeight / 25)
    for (let i = 0; i < loop; i++) {
        row[row.length] = <BgRow />

    }
}

export default BackgroundGrid;