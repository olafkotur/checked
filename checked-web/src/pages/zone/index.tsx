import React from 'react';

import UseAnimations from 'react-useanimations';
import { RouteComponentProps } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faUser, faSun } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, Grid, CardHeader, Typography, Paper, Icon } from '@material-ui/core';
import { IZone } from '../../types';
import { Speed } from '@material-ui/icons';

interface IState {
    loaded: boolean;
}

interface IProps extends RouteComponentProps {
    userID: number;
    zoneDetails: IZone;
}
export class Zone extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { loaded: false};
    }

    componentDidMount(): void {
        this.setState({loaded: true});
    }

    render(): JSX.Element {
        return (
            <div className="dashContainer">
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Card className="dashCard">
                            {/* {!this.state.loaded &&
                                <UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} />
                            } */}
                            {this.state.loaded &&
                                <Grid container spacing={0} >
                                    <Grid item xs={12}>
                                    <CardHeader title={this.props.zoneDetails.name} avatar={<Paper className="zoneIcon"><Typography variant="h6" className="w-100 h-100 text-center"><b>{this.props.zoneDetails.zoneId}</b></Typography></Paper>} className="mutedBlack mt-2">
                                        </CardHeader>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CardContent className="pt-1 ml-3 mr-3 pl-0 pr-0 border-top border-muted">
                                            <Grid container spacing={0} className="mt-3 border-bottom pt-5 pb-5">
                                                <Grid item xs={2} className="border-right p-3">
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} key={0} className="text-center">
                                                            <FontAwesomeIcon icon={faThermometerHalf} className="zoneBigIcon"/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h3" className="w-100 text-center">
                                                                20°C
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
                                                    Graph Memes Here
                                                </Grid>
                                            </Grid>
                                        <Grid container spacing={0} className="border-bottom  pt-5 pb-5">
                                                <Grid item xs={2} className="border-right p-3">
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} key={0} className="text-center">
                                                            <FontAwesomeIcon icon={faUser} className="zoneBigIcon" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h3" className="w-100 text-center">
                                                                19
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
                                                    Graph Memes Here
                                                    </Grid>
                                            </Grid>
                                        <Grid container spacing={0} className=" pt-5 pb-5">
                                                <Grid item xs={2} className="border-right h-100 p-3">
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} key={0} className="text-center">
                                                            <FontAwesomeIcon icon={faSun} className="zoneBigIcon lightGradient" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h3" className="w-100 text-center">
                                                                90
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12} className="text-center">
                                                            <Typography className="w-100 text-center" variant="caption">
                                                                <i className="text-center">Current Light</i>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={10} className="p-3">
                                                    Graph Memes Here
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