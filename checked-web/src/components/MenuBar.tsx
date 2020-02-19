/******************************************************************
* This code was originally written for SCC330 by George Park in   *
* JavaScript. I have converted it to TypeScript and changed a     *
* fair amount of the code to allow this component to better fit   *
* the application.                                                *
*******************************************************************/

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, ListItemIcon, List, Divider, ListItem, ListItemText, Collapse } from '@material-ui/core/';
import { Info as Icon, Menu, Brightness4, Brightness7, Dashboard, Map, Person, ExpandLess, ExpandMore, FormatListNumbered, ErrorOutline } from '@material-ui/icons/';
import { navigate } from '@reach/router';

import Logo from '../media/checkedLogo.jpg';
import { IZone } from '../types';
import Notifications from './Notifications';

interface IState {
    drawerOpen: boolean;
    drawerClass: string;
    dimmerClass: string;
    open: boolean;
    subDrawerOpen: boolean;
    themeIcon: JSX.Element;
    darkTheme: boolean;
    zones: Array<IZone>;
}

interface IProps {
    setDarkMode(darkMode: boolean): void;
    zones: Array<IZone>;
    userID: number;
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
            themeIcon: <Brightness4 />, 
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

    setDarkMode = (): void => {
        if(this.state.darkTheme){
            this.setState({ themeIcon: <Brightness4 />, darkTheme: false });
            this.props.setDarkMode(false);
        } else {
            this.setState({ themeIcon: <Brightness7 />, darkTheme: true });
            this.props.setDarkMode(true);
        }
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

                        <IconButton onClick={this.setDarkMode} className="mr-1">
                            {this.state.themeIcon}
                        </IconButton>

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
                                <ListItem button key={'placeholder2'} disabled={true}>
                                    <ListItemIcon><Icon /></ListItemIcon>
                                    <ListItemText primary={'Placeholder'} />
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