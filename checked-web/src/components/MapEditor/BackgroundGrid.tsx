import React from 'react';

import './CSS/background.css';
import BgColumn from './BgColumn';
import BgRow from './BgRow';

const col: any[] = [];
const row: any[] = [];

function genCol(): void {
    const loop = Math.floor(window.innerWidth / 25);

    for (let i = 0; i < loop; i++) {
        col[col.length] = <BgColumn key={i} />;

    }
}

function genRow(): void {
    const loop = Math.floor(window.innerHeight / 25);
    for (let i = 0; i < loop; i++) {
        row[row.length] = <BgRow key={i} />;

    }
}

const BackgroundGrid = (): JSX.Element => {
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



export default BackgroundGrid;