import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import ZoneVisualisation from './ZoneVisualisation';
import {IZone} from '../../../types';
import { Speed, MyLocation } from '@material-ui/icons';

interface IState {
    tabValue: number;
}

interface IProps {
    zoneData: Array<IZone>;
}

class DashTabs extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { tabValue: 0 };
        this.handleChange = this.handleChange.bind('this');
    }

    handleChange = (event: any, newValue: number): void => this.setState({tabValue: newValue});

    handleChangeIndex = (index: number): void => this.setState({ tabValue: index });
    
    render(): JSX.Element {

        function TabPanel(props: any): JSX.Element {
            const { children, value, index, ...other } = props;

            return (
                <Typography
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`tabpanel-${index}`}
                    {...other}
                >
                    <Box p={0} style={{ height: '70vh', minHeight: '500px'}}>{children}</Box>
                </Typography>
            );
        }

        return (
            <div>
                <TabPanel value={this.state.tabValue} index={0}>
                    <ZoneVisualisation zoneData={this.props.zoneData} type='location'/>
                </TabPanel>
                <TabPanel value={this.state.tabValue} index={1}>
                    <ZoneVisualisation zoneData={this.props.zoneData} type='temperature' />
                </TabPanel>
                <AppBar position="static" color="inherit" style={{boxShadow: 'none'}}>
                    <Tabs value={this.state.tabValue} onChange={this.handleChange} variant="fullWidth" >
                        <Tab label="Location" icon={<MyLocation className="mr-2 mt-1"/>}/>
                        <Tab label="Temperature" icon={<Speed className="mr-2 mt-1"/>}/>
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default DashTabs;