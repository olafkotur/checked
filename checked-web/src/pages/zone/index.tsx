import React from 'react';

import UseAnimations from 'react-useanimations';
import { RouteComponentProps } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faUser } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, Grid, CardHeader, Typography, Paper } from '@material-ui/core';
import { IZone, IMemberLocation } from '../../types';
import TimeSeriesGraph from '../../components/Zone/TimeSeriesGraph';
import { HistoryService } from '../../api/HistoryService';
import { LiveService } from '../../api/LiveService';
import { LocationService } from '../../api/LocationService';

interface IState {
    loaded: boolean;
    zoneDetails: IZone;
    historicalData: Array<any>;
    currentTemp: number;
    currentCount: number;
}

interface IProps extends RouteComponentProps {
    userID: number;
    zoneDetails: IZone;
}
export class Zone extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { loaded: false, zoneDetails: props.zoneDetails, historicalData: [], currentCount: 0, currentTemp: 0};

    }

    componentDidMount(): void {
        this.getZoneData();
        console.log(this.state.zoneDetails.zoneId, this.state.currentCount, this.state.currentTemp);
    }

    getZoneData(): void {
        let count = this.state.currentCount;

        LiveService.getLiveTempDataByZone(this.state.zoneDetails.zoneId).then((res) => {
            
            this.setState({currentTemp: res.result.value});

            LocationService.getAllMemberLocationsByUser(this.props.userID).then((res) => {
                
                count = res.result.filter((member: IMemberLocation) => {return member.zoneId === this.state.zoneDetails.zoneId;}).length;
                this.setState({currentCount: count});

                HistoryService.getHistoricByUser(this.props.userID).then((res) => {
                    
                    this.setState({
                        historicalData: res.result,
                        loaded: true
                    });
                });
            });
        });
    }

    formatGraphData(dataIn: Array<any>, dataType: ("temperatures" | "locations") ): Array<any> {
        const dataOut: Array<any> = [];

        if(dataType !== "locations"){
            dataIn.forEach((log) => {
                const reading = log[dataType].find((record: any) => record.zoneId === this.state.zoneDetails.zoneId);
                let dataPoint: number;
                if(reading === undefined){
                    dataPoint = 0;
                } else {
                    dataPoint = reading.value;
                    const d = new Date(log.createdAt);
                    const dUnix = d.getTime() * 1000;
                    dataOut.push(
                        [dUnix, dataPoint]
                    );
                }

            });
        } else {
            dataIn.forEach((log) => {
                const reading = log.locations.find((record: any) => record.zoneId === this.state.zoneDetails.zoneId);
                let dataPoint: number;
                if (reading === undefined) {
                    dataPoint = 0;
                } else {
                    dataPoint = reading.members.length; 
                    const d = new Date(log.createdAt);
                    const dUnix = d.getTime() * 1000;
                    dataOut.push(
                        [dUnix, dataPoint]
                    );
                }

            });
        }
        return dataOut;
    }

    render(): JSX.Element {

        return (
            <div className="dashContainer">
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Card className="dashCard">
                            {!this.state.loaded &&
                                <UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} />
                            }
                            {this.state.loaded &&
                                <Grid container spacing={0} >
                                    <Grid item xs={12}>
                                    <CardHeader title={this.state.zoneDetails.name} avatar={<Paper className="zoneIcon"><Typography variant="h6" className="w-100 h-100 text-center"><b>{this.props.zoneDetails.zoneId}</b></Typography></Paper>} className="mutedBlack mt-2">
                                        </CardHeader>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CardContent className="pt-1 ml-3 mr-3 pl-0 pr-0 border-top border-muted scrollCard styledScrollBar mb-2">
                                            <Grid container spacing={0} className="mt-3 pt-5 pb-5">
                                                <Grid item xs={2} className="border-right vcenterParent">
                                                    <Grid container spacing={0} className="vcenterChild pr-3">
                                                        <Grid item xs={12} key={0} className="text-center">
                                                            <FontAwesomeIcon icon={faThermometerHalf} className="zoneBigIcon tempGradient"/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h3" className="w-100 text-center">
                                                                {this.state.currentTemp}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12} className="text-center">
                                                            <Typography className="w-100 text-center" variant="caption">
                                                                <i className="text-center">Current Temperature</i>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={10} className="p-3">
                                                    <TimeSeriesGraph
                                                        name={this.state.zoneDetails.name + ' Temperature History'}
                                                        data={this.formatGraphData(this.state.historicalData, 'temperatures')}
                                                        labels={[]}
                                                        minimumY={0}
                                                        maximumY={50}
                                                        width="100%"
                                                        height="400px"
                                                        type="temperature"
                                                        unit={'°C'}
                                                    />
                                                </Grid>
                                            </Grid>
                                        <Grid container spacing={0} className="pt-5 pb-5">
                                            <Grid item xs={2} className="border-right vcenterParent">
                                                <Grid container spacing={0} className="vcenterChild pr-3">
                                                        <Grid item xs={12} key={0} className="text-center">
                                                            <FontAwesomeIcon icon={faUser} className="zoneBigIcon userGradient p-3" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h3" className="w-100 text-center">
                                                                {this.state.currentCount}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12} className="text-center">
                                                            <Typography className="w-100 text-center" variant="caption">
                                                                <i className="text-center">Current Members</i>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={10} className="p-3">
                                                    <TimeSeriesGraph
                                                        name={this.state.zoneDetails.name + ' Member History'}
                                                        data={this.formatGraphData(this.state.historicalData, 'locations')}
                                                        labels={[]}
                                                        minimumY={0}
                                                        maximumY={15}
                                                        width="100%"
                                                        height="400px"
                                                        type="users"
                                                    />
                                                    </Grid>
                                            </Grid>
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