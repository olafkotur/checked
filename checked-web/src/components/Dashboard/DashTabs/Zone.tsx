import React from 'react';

import { Paper, Grid, Typography, Popover, IconButton, Box, Icon, Button } from "@material-ui/core";
import { Close, NotificationsNone, NotificationsActive } from "@material-ui/icons";
import { IZone } from '../../../types';

import { AssemblyService } from '../../../api/AssemblyService';
import {LiveService} from '../../../api/LiveService';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faUser } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    zone: IZone;
    key: any;
    currentCount: number;
    userID: number;
}

interface IState {
    anchorEl: (Element | null);
    open: boolean;
    ringing: boolean;
    reading: number;

}

class Zone extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);


        this.state = { anchorEl: null, open: false, ringing: false, reading: 0, };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toggleAssemble = this.toggleAssemble.bind(this);
        this.determineTextColor = this.determineTextColor.bind(this);
    }

    componentDidMount(): void {
        LiveService.getLiveTempDataByZone(this.props.zone.zoneId).then((res) => {
            this.setState({ reading: res.result.value });
        });
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

    determineTextColor(hex: any): string {

        //convert hex to rgb
        console.log(this.props.zone.color);
        hex = hex.replace('#', '');
        const red = parseInt(hex.substring(0, 2), 16);
        const green = parseInt(hex.substring(2, 4), 16);
        const blue = parseInt(hex.substring(4, 6), 16);

        if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
            return "#000000";
        }
        else {
            return "#ffffff";
        }

    }

    render(): JSX.Element {

        let symbol;
        let reading;

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
                            <Typography variant="h6" className="ml-1 mt-1 fontMontserrat mutedBlack zoneName" style={{color:this.determineTextColor(this.props.zone.color)}}>
                                {this.props.zone.name}
                            </Typography>

                            <Typography variant="subtitle1" className="ml-1 mutedBlack font-italic" >
                                {this.props.zone.activity.name || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                                <IconButton onClick={this.handleClose} className="mr-1 mt-1" size="small" >
                                    <Close fontSize="small" />
                                </IconButton>
                            </Grid>

                            <Typography variant="h6" className="w-100 text-center pb-4 border-bottom mx-4">
                                {this.props.zone.name} Overview
                            </Typography>


                            <Grid item xs={6} key={1} className="border-right pt-4 pb-4">
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className="w-100 text-center">
                                            {this.props.currentCount}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} className="text-center">
                                        <Typography className="w-100 text-center" variant="caption">
                                            <i className="text-center">Members Present</i>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} key={0} className="w-100 text-center mt-2">
                                        <Icon >
                                            <FontAwesomeIcon icon={faUser} className="dashOverviewIcon" />
                                        </Icon>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={6} className="pt-4 pb-4">
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className="w-100 text-center">
                                            {this.state.reading || '?'}°C
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} className="text-center">
                                        <Typography className="w-100 text-center" variant="caption">
                                            <i className="text-center">Current Temperature</i>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} key={0} className="w-100 text-center mt-2">
                                        <Icon >
                                            <FontAwesomeIcon icon={faThermometerHalf} className="dashOverviewIcon" />
                                        </Icon>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* <Grid item xs={4} key={2} className="pt-4 pb-4">
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className="w-100 text-center">
                                            {this.props.zone.data?.currentLight || '?'} TODO: ?
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} className="text-center">
                                        <Typography className="w-100 text-center" variant="caption">
                                            <i className="text-center">Light Level</i>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} key={0} className="w-100 text-center mt-2">
                                        <Icon >
                                            <FontAwesomeIcon icon={faSun} className="dashOverviewIcon" />
                                        </Icon>
                                    </Grid>
                                </Grid>
                            </Grid> */}

                            {this.getZoneAlertButton()}

                            <Grid item xs={2} key={9}>
                            </Grid>
                            <Grid item xs={4} key={10}>
                                <Button disableElevation variant="contained" className="dashOverviewButton" color="primary" onClick={(): any => navigate(this.props.zone.zoneId)}>
                                    Detailed View
                                </Button>
                            </Grid>
                            <Grid item xs={4} key={11}>
                                <Button variant="outlined" className="dashOverviewButton" color="primary" onClick={(): any => navigate('editor')} key={'MapEditor'}>
                                    Edit Zones
                                </Button>
                            </Grid>

                        </Grid>


                    </Box>

                </Popover>
            </div>

        );
    }
}

export default Zone;