import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";

interface IState {
    tabValue: number;
}

class DashTabs extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = { tabValue: 0 };
        this.handleChange = this.handleChange.bind('this');
    }

    handleChange = (event: any, newValue: number): void => this.setState({tabValue: newValue});
    
    render(): JSX.Element {

        function TabPanel(props: any): JSX.Element {
            const { children, value, index, ...other } = props;

            return (
                <Typography
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                    {...other}
                >
                    <Box p={3}>{children}</Box>
                </Typography>
            );
        }

        return (
            <div>
                <TabPanel value={this.state.tabValue} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={this.state.tabValue} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={this.state.tabValue} index={2}>
                    Item Three
                </TabPanel>
                <AppBar position="static" color="inherit">
                    <Tabs value={this.state.tabValue} onChange={this.handleChange} variant="fullWidth" >
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default DashTabs;