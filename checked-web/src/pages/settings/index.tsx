import React from 'react';

import { ZoneService } from '../../api/ZoneService';
import {LocationService} from '../../api/LocationService';
import UseAnimations from 'react-useanimations';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { DashboardRounded, SettingsRounded } from '@material-ui/icons';
import {IZone, ISettings} from '../../types';


interface IState {
    settings: ISettings;
}

interface IProps extends RouteComponentProps {
    userID: number;
    settings: ISettings;
}
export class Settings extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {settings: props.settings};
    }

    // componentDidMount(): void {
    // }

    // componentWillUnmount(): void {
    // }

    render(): JSX.Element {
        return (
            <div className="dashContainer">
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Card className="dashCard">
                            <Grid container spacing={0} >
                                <Grid item xs={12}>
                                    <CardHeader title="Settings" avatar={<SettingsRounded className="w-100 h-100" />} className="mutedBlack mt-2">
                                    </CardHeader>
                                </Grid>
                                <Grid item xs={12}>
                                    <CardContent className="pt-4 ml-3 mr-3 pl-0 pr-0 border-top border-muted">
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} className="border-right">
                                                Logo
                                                DarkMode
                                                TimeZone
                                                ThemeColour
                                            </Grid>
                                            <Grid item xs={6}>
                                                Interval
                                                MinTemp
                                                MaxTemp
                                                GatheringThreshold
                                            </Grid>
                                        </Grid>
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

