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
    for (let i = 0; i < 50; i++) {
        col[col.length] = <BgColumn/>
        
    }
}

function genRow() {
    for (let i = 0; i < 50; i++) {
        row[row.length] = <BgRow />

    }
}

export default BackgroundGrid;