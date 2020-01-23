import React from 'react';
import SideMenu from './SideMenu'
import MainEditor from './MainEditor'
import "./CSS/Editor.css"
import '../InteractJS/DragZone.js'

const EditorContainer = () => {
    return (
        <div className = "editorContainer">
            <SideMenu />
            <MainEditor />
        </div>
    );
};

export default EditorContainer;