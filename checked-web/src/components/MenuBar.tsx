/******************************************************************
* This code was originally written for SCC330 by George Park in   *
* JavaScript. I have converted it to TypeScript and changed a     *
* fair amount of the code to allow this component to better fit   *
* the application.                                                *
*******************************************************************/

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, ListItemIcon, List, Divider, ListItem, ListItemText } from '@material-ui/core/';
import { Info as Icon, Menu } from '@material-ui/icons/';
import { navigate } from '@reach/router';

import Logo from '../media/checkedLogo.jpg';

interface IState {
    drawerOpen: boolean;
    drawerClass: string;
    dimmerClass: string;
    open: boolean;
}

interface IProps {
}

class MenuBar extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = { drawerOpen: false, drawerClass: 'drawer drawerClosed', dimmerClass: 'dimmer fadeOut', open: false };
    }

    toggleDrawer = (): void => {
        if (this.state.drawerOpen === true) {
            this.setState({ drawerOpen: false, drawerClass: 'drawer drawerClosed', dimmerClass: 'dimmer fadeOut', open: false });
        } else {
            this.setState({ drawerOpen: true, drawerClass: 'drawer drawerOpen', dimmerClass: 'dimmer fadeIn' });
        }
    };

    setOpen = (): void => {
        this.setState({ open: true });
    };

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
                                <ListItem button onClick={(): any => navigate('/')} key={'placeholder'} >
                                    <ListItemIcon><Icon /></ListItemIcon>
                                    <ListItemText>Memes</ListItemText>
                                </ListItem>
                                <ListItem button onClick={(): any => navigate('meme')} key={'placeholder'} >
                                    <ListItemIcon><Icon /></ListItemIcon>
                                    <ListItemText>Memes1</ListItemText>
                                </ListItem>

                            </List>
                            <Divider />
                            <List>
                                <ListItem button key={'placeholder'} disabled={true}>
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