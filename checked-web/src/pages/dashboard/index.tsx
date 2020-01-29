import React from 'react';

import { ZoneService } from '../../api/ZoneService';
import {LocationService} from '../../api/LocationService';
import UseAnimations from 'react-useanimations';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { DashboardRounded } from '@material-ui/icons';
import {IZone} from '../../types';

import DashTabs from '../../components/Dashboard/DashTabs';

interface IState {
    zones: Array<IZone>;
    locations: Array<any>;
    loaded: boolean;
    intervals: Array<any>;
}

interface IProps extends RouteComponentProps {
    userID: number;
}
export class Dashboard extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {zones: [], locations: [], loaded: false, intervals: []};
    }

    componentDidMount(): void {
        this.getZones(); // call once initially so no wait for 5secs
        this.getLocations();

        //const zoneInterval = setInterval(() => this.getZones(), 5000); // setInterval on get zones function and assign the result to a const
        //this.state.intervals.push(zoneInterval); // push interbval on to array for cleanup later

        //const locationInterval = setInterval(() => this.getZones(), 5000); // setInterval on get locations function and assign the result to a const
        //this.state.intervals.push(locationInterval); // push interbval on to array for cleanup later
    }

    componentWillUnmount(): void {
        this.state.intervals.forEach((interval) => { // for each interval we have created (this is for futureproofing if we add extra stuff)
            clearInterval(interval); // clear the interval
        });
    }

    getLocations(): void {
        LocationService.getAllMemberLocationsByUser(this.props.userID).then((res) => {
            this.setState({locations: res.result});
            
        }).catch(() => {
            console.error('Error loading Zone Data.');
        });
    }

    getZones(): void {
        ZoneService.loadZonesByUser(this.props.userID).then((res) => {
            this.setState({
                zones: res.result,
                loaded: true
            });
        }).catch(() => {
            console.error('Error loading Zone Data.');
        });
    }

    render(): JSX.Element {
        console.log(this.state);
        return (
            <div className="dashContainer">
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Card className="dashCard">
                            {!this.state.loaded &&
                                <UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{transform: 'rotate(-90deg)'}}/>
                            }   
                            {this.state.loaded && 
                                <Grid container spacing={0} >
                                    <Grid item xs={12}>
                                        <CardHeader title="Dashboard" avatar={<DashboardRounded className="w-100 h-100" />} className="mutedBlack mt-2">
                                        </CardHeader>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CardContent className="pt-1 ml-3 mr-3 pl-0 pr-0 border-top border-muted">
                                            <DashTabs zoneData={this.state.zones} locationData={this.state.locations} userID={this.props.userID}/>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            }   
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

