import React from 'react';
// import ZoneBlock from './MapEditor/ZoneBlock'

import EditorContainer from './MapEditor/EditorContainer'
import BackgroundGrid from './MapEditor/BackgroundGrid';

const MapEditor = () => {
    return (
        <div>
            <EditorContainer/>
            <BackgroundGrid/>
        </div>
    );
};

export default MapEditor;
