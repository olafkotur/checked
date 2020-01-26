import React from 'react';
// import ZoneBlock from './MapEditor/ZoneBlock'

import EditorContainer from '../../components/MapEditor/EditorContainer';
import BackgroundGrid from '../../components/MapEditor/BackgroundGrid';
import { RouteComponentProps } from '@reach/router';



class MapEditor extends React.Component<RouteComponentProps , {}> {

    render(): JSX.Element {
        return (
            <div>
                <EditorContainer />
                <BackgroundGrid />
            </div>
        );
    }
};

export default MapEditor;
