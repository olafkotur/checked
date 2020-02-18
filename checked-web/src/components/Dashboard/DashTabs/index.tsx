import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import ZoneVisualisation from './ZoneVisualisation';
import {IZone} from '../../../types';
import { Speed, MyLocation } from '@material-ui/icons';

interface IState {
    tabValue: number;
}

interface IProps {
    zoneData: Array<IZone>;
    userID: number;
    locationData: Array<any>;
}

class DashTabs extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    
    render(): JSX.Element {

        return (
            <div>
                <ZoneVisualisation zoneData={this.props.zoneData} userID={this.props.userID} locationData={this.props.locationData}/>
            </div>
        );
    }
}

export default DashTabs;