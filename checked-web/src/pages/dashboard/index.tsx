import React from 'react';

import { ZoneService } from '../../api/ZoneService';
import UseAnimations from 'react-useanimations';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { DashboardRounded } from '@material-ui/icons';

import DashTabs from '../../components/DashTabs';

interface IState {
}

interface IProps {
}

export class Dashboard extends React.Component<RouteComponentProps, IState> {


    render(): JSX.Element {

        return (
            <div className="dashContainer">
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Card className="dashCard">
                            <Grid container spacing={1}>
                                <Grid item xs={12} >
                                    <CardHeader title="Dashboard" avatar={<DashboardRounded className="w-100 h-100" />} className="mutedBlack mt-1">
                                    </CardHeader>
                                </Grid>
                                <Grid item xs={12} >
                                    <CardContent>
                                        <DashTabs />
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

