import React from 'react';

import { Paper, Grid, Typography, Popover, Button, IconButton, Box } from "@material-ui/core";
import { Speed, LocationOn as Location, Close, NotificationsNone, NotificationsActive } from "@material-ui/icons";
import { IZone } from '../../../types';

import { AssemblyService } from '../../../api/AssemblyService';
import { LiveService } from '../../../api/LiveService';

interface IProps {
    zone: IZone;
    type: 'temperature' | 'location';
    key: any;
    userID: number;
    reading?: number;
}

interface IState {
    anchorEl: (Element|null);
    open: boolean;
    ringing: boolean;
    reading: (number|string);
}

class Zone extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        let reading;
        if(this.props.reading){
            reading = this.props.reading;
        } else {
            reading = '0';
        }

        this.state = { anchorEl: null, open: false, ringing: false, reading };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toggleAssemble = this.toggleAssemble.bind(this);
    }

    componentDidMount(): void {
        if(this.props.type === 'temperature') {
            LiveService.getLiveTempDataByZone(this.props.zone.zoneId).then((res) => {
                this.setState({ reading: res.result.value });
            });
        }
    }

    handleClick(event: React.MouseEvent): void {
        if(this.state.open ){
            this.setState({ anchorEl: null, open: false });
        } else {
            this.setState({ anchorEl: event.currentTarget, open: true });
        }
    }

    handleClose(): void {
        this.setState({anchorEl: null, open: false});
    }

    toggleAssemble(): void {
        if(this.state.ringing){
            AssemblyService.stopAssemblyCallFromZone(this.props.zone.zoneId).then(() => {
                this.setState({ringing: false});
            });
        } else {
            AssemblyService.callAssemblyFromZone(this.props.zone.zoneId).then(() => {
                this.setState({ ringing: true });
            });
        }
    }

    getPopoverContent(): Array<JSX.Element> {

        const returnArr: Array<JSX.Element> = [];

        if(this.state.ringing){
            returnArr.push(
                <Grid item xs={12} key={0}>
                    <Typography className="w-100 text-center mt-2">
                        Alerting all members in Zone {this.props.zone.zoneId}
                    </Typography>
                </Grid>
            );
            returnArr.push(
                <Grid className="mb-3 text-center" item xs={12} key={1}>
                    <IconButton onClick={this.toggleAssemble} size="medium" color="primary">
                        <NotificationsActive fontSize="large" className="assembleActive"/>
                    </IconButton>
                </Grid>
            );
        } else {
            returnArr.push(
                <Grid item xs={12} key={3}>
                    <Typography className="w-100 text-center mt-2">
                        Assemble members in Zone {this.props.zone.zoneId}?
                    </Typography>
                </Grid>
            );
            returnArr.push(
                <Grid className="mb-3 text-center" item xs={12} key={2}>
                    <IconButton onClick={this.toggleAssemble} size="medium">
                        <NotificationsNone fontSize="large"/>
                    </IconButton>
                </Grid>
            );
        }

        return returnArr;
    }

    render(): JSX.Element {

        let symbol;
        let reading;

        if(this.props.type === 'temperature'){
            symbol = <Speed className="d-flex align-self-center mr-1 ml-1" fontSize="default"/>;
            reading = this.state.reading + '°C';
        } else if (this.props.type === 'location'){
            symbol = <Location className="d-flex align-self-center mr-1 ml-1" fontSize="default"/>;
            reading = this.state.reading;
        }

        const popoverContent = this.getPopoverContent();

        return(
            <div className="zoneVisZone"
                style={{
                    width: this.props.zone.width,
                    height: this.props.zone.height,
                    top: this.props.zone.yValue,
                    left: this.props.zone.xValue,
                    backgroundColor: this.props.zone.color}} >
                <Paper
                    className="w-100 h-100"
                    elevation={0}
                    onClick={this.handleClick} 
                    style={{backgroundColor: 'transparent'}}>
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
                                width: '300px'
                            }}>

                            <Grid item xs={10}>
                            </Grid>
                            <Grid item xs={2} >
                                <IconButton onClick={this.handleClose} className="ml-3" size="small" >
                                    <Close fontSize="small"/>
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