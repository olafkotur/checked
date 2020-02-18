import React from 'react';

import { Paper, Grid, Typography, Popover, IconButton, Box, Icon, Button } from "@material-ui/core";
import { Speed, LocationOn as Location, Close, NotificationsNone, NotificationsActive, Person, Brightness7 } from "@material-ui/icons";
import { IZone } from '../../../types';

import { AssemblyService } from '../../../api/AssemblyService';
import { LiveService } from '../../../api/LiveService';
import { navigate } from '@reach/router';

interface IProps {
    zone: IZone;
    key: any;
    userID: number;
}

interface IState {
    anchorEl: (Element | null);
    open: boolean;
    ringing: boolean;
}

class Zone extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);


        this.state = { anchorEl: null, open: false, ringing: false };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toggleAssemble = this.toggleAssemble.bind(this);
    }

    handleClick(event: React.MouseEvent): void {
        if (this.state.open) {
            this.setState({ anchorEl: null, open: false });
        } else {
            this.setState({ anchorEl: event.currentTarget, open: true });
        }
    }

    handleClose(): void {
        this.setState({ anchorEl: null, open: false });
    }

    toggleAssemble(): void {
        if (this.state.ringing) {
            AssemblyService.stopAssemblyCallFromZone(this.props.zone.zoneId).then(() => {
                this.setState({ ringing: false });
            });
        } else {
            AssemblyService.callAssemblyFromZone(this.props.zone.zoneId).then(() => {
                this.setState({ ringing: true });
            });
        }
    }

    getPopoverContent(): Array<JSX.Element> {
        const popoverContent: Array<JSX.Element> = [];

        popoverContent.push(
            <Grid item xs={4} key={0} className="border-right pt-4 pb-4">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className="w-100 text-center">
                            {this.props.zone.data?.currentTemp || '20'}°C
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className="text-center">
                        <Typography className="w-100 text-center" variant="caption">
                            <i className="text-center">Current Temperature</i>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} key={0} className="w-100 text-center mt-2">
                        <Icon >
                            <Speed fontSize="large" className="dashOverviewIcon" />
                        </Icon>
                    </Grid>
                </Grid>
            </Grid>
        );

        popoverContent.push(
            <Grid item xs={4} key={0} className="border-right pt-4 pb-4">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className="w-100 text-center">
                            {this.props.zone.data?.currentCount || '0'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className="text-center">
                        <Typography className="w-100 text-center" variant="caption">
                            <i className="text-center">Members Present</i>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} key={0} className="w-100 text-center mt-2">
                        <Icon >
                            <Person fontSize="large" className="dashOverviewIcon" />
                        </Icon>
                    </Grid>
                </Grid>
            </Grid>
        );

        popoverContent.push(
            <Grid item xs={4} key={0} className="pt-4 pb-4">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className="w-100 text-center">
                            {/* {this.props.zone.data?.currentLight || '0'} TODO: */} 0
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className="text-center">
                        <Typography className="w-100 text-center" variant="caption">
                            <i className="text-center">Light Level</i>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} key={0} className="w-100 text-center mt-2">
                        <Icon >
                            <Brightness7 fontSize="large" className="dashOverviewIcon" />
                        </Icon>
                    </Grid>
                </Grid>
            </Grid>
        );


        this.getZoneAlertButton().forEach(element => {
            popoverContent.push(element);
        });

        popoverContent.push(
            <Grid xs={2}>

            </Grid>
        );

        popoverContent.push(
            <Grid item xs={4}>
                <Button variant="contained" className="dashOverviewButton" color="primary">
                    Detailed View
                </Button>
            </Grid>
        );

        popoverContent.push(
            <Grid item xs={4}>
                <Button variant="outlined" className="dashOverviewButton" color="primary" onClick={(): any => navigate('editor')} key={'MapEditor'}>
                    Edit Zones
                </Button>
            </Grid>
        );

        return popoverContent;
    }

    getZoneAlertButton(): Array<JSX.Element> {

        const returnArr: Array<JSX.Element> = [];

        if (this.state.ringing) {
            returnArr.push(
                <Grid item xs={12} key={0} className="border-top mx-4 pt-3">
                    <Typography className="w-100 text-center mt-2">
                        Alerting all members in Zone {this.props.zone.zoneId}
                    </Typography>
                </Grid>
            );
            returnArr.push(
                <Grid className="mb-3 text-center border-bottom mx-4" item xs={12} key={1}>
                    <IconButton onClick={this.toggleAssemble} size="medium" color="primary">
                        <NotificationsActive fontSize="large" className="assembleActive" />
                    </IconButton>
                </Grid>
            );
        } else {
            returnArr.push(
                <Grid item xs={12} key={3} className="border-top mx-4 pt-3">
                    <Typography className="w-100 text-center mt-2">
                        Assemble members in Zone {this.props.zone.zoneId}?
                    </Typography>
                </Grid>
            );
            returnArr.push(
                <Grid className="mb-3 text-center border-bottom mx-4" item xs={12} key={2}>
                    <IconButton onClick={this.toggleAssemble} size="medium">
                        <NotificationsNone fontSize="large" />
                    </IconButton>
                </Grid>
            );
        }

        return returnArr;
    }

    render(): JSX.Element {

        let symbol;
        let reading;

        const popoverContent = this.getPopoverContent();

        return (
            <div className="zoneVisZone"
                style={{
                    width: this.props.zone.width,
                    height: this.props.zone.height,
                    top: this.props.zone.yValue,
                    left: this.props.zone.xValue,
                    backgroundColor: this.props.zone.color
                }} >
                <Paper
                    className="w-100 h-100"
                    elevation={0}
                    onClick={this.handleClick}
                    style={{ backgroundColor: 'transparent' }}>
                    <Grid container spacing={0} className="h-100 ml-2">
                        <Grid item xs={12}>
                            <Typography variant="h6" className="ml-1 mt-1 fontMontserrat mutedBlack zoneName" >
                                {this.props.zone.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" className="ml-1 mutedBlack font-italic" >
                                {this.props.zone.activity.name || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="h-100 w-100 d-flex flex-row align-items-center">
                                {symbol}
                                <Typography variant="subtitle1" className="mutedBlack font-bold d-flex align-self-center" >
                                    {reading}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>

                </Paper>


                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box className="p-2">
                        <Grid container spacing={1}
                            style={{
                                width: '500px'
                            }}>

                            <Grid item xs={11}>
                            </Grid>
                            <Grid item xs={1} >
                                <IconButton onClick={this.handleClose} className="mr-3" size="small" >
                                    <Close fontSize="small" />
                                </IconButton>
                            </Grid>

                            {popoverContent}

                        </Grid>


                    </Box>

                </Popover>
            </div>

        );
    }
}

export default Zone;