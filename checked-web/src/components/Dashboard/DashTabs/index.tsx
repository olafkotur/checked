import React from 'react';
import ZoneVisualisation from './ZoneVisualisation';
import {IZone} from '../../../types';

interface IState {
    tabValue: number;
}

interface IProps {
    zoneData: Array<IZone>;
    userID: number;
    locationData: Array<any>;
}

class DashTabs extends React.Component<IProps, IState> {
    
    render(): JSX.Element {

        return (
            <div>
                <ZoneVisualisation zoneData={this.props.zoneData} userID={this.props.userID} locationData={this.props.locationData}/>
            </div>
        );
    }
}

export default DashTabs;