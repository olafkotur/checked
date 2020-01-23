import React from 'react';
import ZoneBlock from './ZoneBlock';
import "./CSS/Editor.css"

const BlockContainer = () => {
    return (
        <div className = "blockContainer">
            <ZoneBlock/>
        </div>
    );
};

export default BlockContainer;