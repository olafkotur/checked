import React from 'react';

import { ZoneService } from '../../api/ZoneService';
import UseAnimations from 'react-useanimations';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { DashboardRounded } from '@material-ui/icons';

import DashTabs from '../../components/Dashboard/DashTabs';

interface IState {
    zones: Array<object>;
    loaded: boolean;
}

interface IProps extends RouteComponentProps {
    userID: number;
}
export class Dashboard extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {zones: [], loaded: false};
    }

    componentDidMount(): void {
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
                                            <DashTabs />
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

