import React from 'react';
// import ZoneBlock from './MapEditor/ZoneBlock'

import EditorContainer from '../../components/MapEditor/EditorContainer';
import BackgroundGrid from '../../components/MapEditor/BackgroundGrid';
import { RouteComponentProps } from '@reach/router';
import { Card, CardHeader, CardContent, Typography, Avatar, Button, IconButton, Divider } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import SaveContainer from '../../components/MapEditor/SaveContainer';
import "../../components/MapEditor/CSS/EditorCard.css";
import { Add, GridOn, Delete, ColorLens, Save } from '@material-ui/icons';


class MapEditor extends React.Component<RouteComponentProps, {}> {

    render(): JSX.Element {




        return (
            <Card className="editorCard" id="editorCard">
                <CardHeader title="Room Layout Editor" avatar={<GridOn />}>

                </CardHeader>

                <Divider />

                <Toolbar >
                    <IconButton aria-label="Add new zone">
                        <Add />
                    </IconButton>

                    <IconButton aria-label="Add new zone">
                        <ColorLens />
                    </IconButton>

                    <Divider orientation="vertical" variant="middle"  />

                    <IconButton aria-label="Add new zone">
                        <Delete />
                    </IconButton>


                    <IconButton aria-label="Add new zone">
                        <Save />
                    </IconButton>
                </Toolbar>
                <Divider />
                <CardContent > 
                    
                </CardContent>
                
                {/* <EditorContainer />
                <BackgroundGrid /> */}
            </Card>
        );
    }
};


export default MapEditor;
