import React from 'react';

import UseAnimations from 'react-useanimations';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Grid, CardHeader, Typography } from '@material-ui/core';
import { IZone } from '../../types';

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
                                    <CardHeader title={this.props.zoneDetails.name} avatar={<div className="zoneIcon"><Typography variant="h6" className="w-100 h-100 text-center"><b>{this.props.zoneDetails.zoneId}</b></Typography></div>} className="mutedBlack mt-2">
                                        </CardHeader>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CardContent className="pt-1 ml-3 mr-3 pl-0 pr-0 border-top border-muted">
                                            Memes
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