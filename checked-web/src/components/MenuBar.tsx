/******************************************************************
* This code was originally written for SCC330 by George Park in   *
* JavaScript. I have converted it to TypeScript and changed a     *
* fair amount of the code to allow this component to better fit   *
* the application.                                                *
*******************************************************************/

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, ListItemIcon, List, Divider, ListItem, ListItemText, Collapse, Tooltip } from '@material-ui/core/';
import { Info as Icon, Menu, Dashboard, Map, Person, ExpandLess, ExpandMore, FormatListNumbered, ErrorOutline, SettingsRounded, ExitToApp } from '@material-ui/icons/';
import { navigate } from '@reach/router';

import CheckedLogo from '../media/checkedLogo.jpg';
import { IZone } from '../types';
import Notifications from './Notifications';

interface IState {
    drawerOpen: boolean;
    drawerClass: string;
    dimmerClass: string;
    open: boolean;
    subDrawerOpen: boolean;
    darkTheme: boolean;
    zones: Array<IZone>;
}

interface IProps {
    setAuthorised(authorised: boolean): void;
    zones: Array<IZone>;
    userID: number;
    menuHidden?: boolean;
    logo: string;
}

class MenuBar extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { 
            drawerOpen: false, 
            subDrawerOpen: false, 
            drawerClass: 'drawer drawerClosed', 
            dimmerClass: 'dimmer fadeOut', 
            open: false, 
            darkTheme: false,
            zones: this.props.zones
        };
    }

    toggleDrawer = (): void => {
        if (this.state.drawerOpen === true) {
            this.setState({ drawerOpen: false, drawerClass: 'drawer drawerClosed', dimmerClass: 'dimmer fadeOut', open: false, subDrawerOpen: false });
        } else {
            this.setState({ drawerOpen: true, drawerClass: 'drawer drawerOpen', dimmerClass: 'dimmer fadeIn' });
        }
    };

    setOpen = (): void => {
        this.setState({ open: true });
    };

    toggleZones = (): void => {
        if (this.state.subDrawerOpen === true) {
            this.setState({ subDrawerOpen: false });
        } else if (this.state.drawerOpen === true) {
            this.setState({ subDrawerOpen: true });
        } else {
            this.setState({ drawerOpen: true, drawerClass: 'drawer drawerOpen', dimmerClass: 'dimmer fadeIn' });
            setTimeout(((): void => {this.setSubDrawerOpen();}), 400); // ensures animation isnt jumpy
        }
    };

    setSubDrawerOpen = (): void => {
        this.setState({ subDrawerOpen: true });
    };

    getZoneIcon(zoneId: number): JSX.Element {
        return (
            <span className="pl-4">
                <strong>{zoneId}</strong>
            </span>
        );
    }

    getZoneListItems(): Array<JSX.Element> {
        const zones: Array<JSX.Element> = [];
        if(this.props.zones.length === 0){
            zones.push(
                <ListItem button key={-100} disabled>
                    <ListItemIcon><ErrorOutline/></ListItemIcon>
                    <ListItemText primary={'No Zones Present'} />
                </ListItem>
            );
        } else {
            this.props.zones.sort().forEach((zone: IZone) => {
                zones.push(
                    <ListItem button key={zone.zoneId} onClick={(): any => navigate(zone.zoneId)}>
                        <ListItemIcon>{this.getZoneIcon(zone.zoneId)}</ListItemIcon>

                        <ListItemText primary={zone.name} />
                    </ListItem>
                );
            });
        }
        return zones;
    }

    render(): JSX.Element {

        let Logo: any;

        if(this.props.logo === ''){
            Logo = CheckedLogo;
        } else {
            Logo = this.props.logo;
        }

        if(this.props.menuHidden){
            return(
                <div>
                    <AppBar position="fixed" className="topBar" color="inherit" style={{ zIndex: 9999 }}>
                        <Toolbar>
                            <Tooltip title="Sign Out">
                                <IconButton onClick={(): void => this.props.setAuthorised(false)}>
                                    <ExitToApp />
                                </IconButton>
                            </Tooltip>

                            <div className="text-center w-100">
                                <Typography variant="h6" className="pl-3 mr-5 montserrat">
                                    - Checked -
                            </Typography>
                            </div>

                            <Notifications userID={this.props.userID} />

                            <div aria-label="logo">
                                <img src={Logo} className="topBarLogo" alt="logo" />
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }

        return (
            <div>
                <AppBar position="fixed" className="topBar" color="inherit" style={{ zIndex: 9999 }}>
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer} style={{transform: "translateX(-20px)"}}>
                            <Menu className="menuIcon" />
                        </IconButton>
                        <div className="text-center w-100">
                            <Typography variant="h6" className="pl-3 mr-5 montserrat">
                                - Checked -
                            </Typography>
                        </div>

                        <Notifications userID={this.props.userID} />

                        <div aria-label="logo">
                            <img src={Logo} className="topBarLogo" alt="logo" />
                        </div>
                    </Toolbar>
                </AppBar>

                <div>
                    <Drawer
                        open={this.state.drawerOpen}
                        variant="permanent">
                        <div
                            role="presentation"
                            className={this.state.drawerClass}
                        >
                            <List>
                                <ListItem button onClick={(): any => navigate('/')} key={'Dashboard'} >
                                    <ListItemIcon><Dashboard /></ListItemIcon>
                                    <ListItemText className="menuText">Dashboard</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.toggleZones}>
                                    <ListItemIcon>
                                        <FormatListNumbered />
                                    </ListItemIcon>
                                    <ListItemText primary="Zones" />
                                    {this.state.open ? <ExpandLess style={{ opacity: 0.4 }} /> : <ExpandMore style={{ opacity: 0.2 }} />}
                                </ListItem>
                                <Collapse in={this.state.subDrawerOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding >
                                        {this.getZoneListItems()}
                                    </List>
                                </Collapse>
                                <ListItem button onClick={(): any => navigate('members')} key={'MemberManager'} >
                                    <ListItemIcon><Person /></ListItemIcon>
                                    <ListItemText className="menuText">Member Manager</ListItemText>
                                </ListItem>
                                <ListItem button onClick={(): any => navigate('editor')} key={'MapEditor'} >
                                    <ListItemIcon><Map /></ListItemIcon>
                                    <ListItemText className="menuText">Map Editor</ListItemText>
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button key={'settings'} onClick={(): any => navigate('settings')}>
                                    <ListItemIcon><SettingsRounded /></ListItemIcon>
                                    <ListItemText primary={'Settings'} className="menuText"/>
                                </ListItem>
                                <ListItem button key={'logout'} onClick={(): void => this.props.setAuthorised(false)}>
                                    <ListItemIcon><ExitToApp /></ListItemIcon>
                                    <ListItemText primary={'Sign Out'} className="menuText"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </div>

                <div className={this.state.dimmerClass} onClick={this.toggleDrawer}>

                </div>
            </div>
        );
    }
}

export default MenuBar;