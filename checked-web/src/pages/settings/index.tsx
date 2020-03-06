import React from 'react';

import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Grid, CardHeader, Typography, Button, Switch, Select, IconButton, MenuItem } from '@material-ui/core';
import { SettingsRounded, ColorLens } from '@material-ui/icons';
import { ISettings} from '../../types';
import { DropzoneArea } from 'material-ui-dropzone';
import { SketchPicker } from 'react-color';
import  Moment  from 'moment-timezone';

interface IState {
    settings: ISettings;
    timeZones: Array<string>;
    displayColourPicker: string;
}

interface IProps extends RouteComponentProps {
    userID: number;
    settings: ISettings;
    saveSettings(settings: ISettings): void;
}
export class Settings extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            settings: props.settings,
            timeZones: Moment.tz.names().sort(),
            displayColourPicker: "d-none",
        };

        this.getBase64 = this.getBase64.bind(this);
        this.handleLogo = this.handleLogo.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.setTimeZone = this.setTimeZone.bind(this);
    }

    // componentDidMount(): void {
    // }

    // componentWillUnmount(): void {
    // }

    handleLogo(files: any): void {
        if(files.length === 0){
            const tempSettings = this.state.settings;
            tempSettings.logoImage = '';
            this.setState({ settings: tempSettings });
        } else {
            this.getBase64(files[0]);
        };
    }

    getBase64(file: any): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const tempSettings = this.state.settings;

        

        reader.onload = (): void => {
            if(reader.result){
                tempSettings.logoImage = reader.result.toString() || '';
                this.setState({ settings: tempSettings });
            };
        };

        reader.onerror = function (error): void {
            console.log('Error: ', error);
        };
    }

    toggleDarkMode(): void {
        const tempSettings = this.state.settings;

        tempSettings.darkMode = !tempSettings.darkMode;

        this.setState({settings: tempSettings});
    }

    handleColourClick = (): void => {
        if (this.state.displayColourPicker === "") {
            this.setState({ displayColourPicker: "d-none" });
        }
        else {
            this.setState({ displayColourPicker: "" });
        }
    };

    handleColourChange = (colour: any): void => {
        const tempSettings = this.state.settings;

        tempSettings.themeColor = colour.hex.toString();

        this.setState({ settings: tempSettings });
    };

    getTimeZoneList(): Array<JSX.Element> {
        const timeZoneList: Array<JSX.Element> = [];
            this.state.timeZones.forEach((timeZone) => {
                timeZoneList.push(
                    <MenuItem value={timeZone.toString()}> {timeZone.toString()} </MenuItem>
                );
            });
        return timeZoneList;
    }

    setTimeZone(event: any): void {
        const tempSettings = this.state.settings;

        tempSettings.timeZone = event.target.value.toString();

        this.setState({settings: tempSettings});
    }

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
                                            <Grid item xs={6} className="border-right pt-3">
                                                <Grid container spacing={3}>

                                                    <Grid item xs={12} className="vcenterParent  mb-3 mt-3">
                                                        <Typography variant="h6" className="vcenterChild text-center w-100 text-muted">
                                                            General Settings
                                                        </Typography>
                                                    </Grid>
                                                    
                                                    <Grid item xs={4} />
                                                    <Grid item xs={2} className="vcenterParent text-left">
                                                        <Typography variant="subtitle2" className="vcenterChild">
                                                            Dark Mode:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Switch
                                                            checked={this.state.settings.darkMode}
                                                            onChange={this.toggleDarkMode}
                                                            value="darkMode"
                                                            color="primary"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} />

                                                    <Grid item xs={4} />
                                                    <Grid item xs={2} className="vcenterParent text-left">
                                                        <Typography variant="subtitle2" className="vcenterChild">
                                                            Time Zone:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Select
                                                            value={this.state.settings.timeZone}
                                                            variant='outlined'
                                                            native={false}
                                                            onChange={this.setTimeZone}
                                                        >
                                                            {this.getTimeZoneList()}
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={4} />

                                                    <Grid item xs={4} />
                                                    <Grid item xs={2} className="vcenterParent text-left">
                                                        <Typography variant="subtitle2" className="vcenterChild">
                                                            Theme Colour:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton size='small' aria-label="Change color" className="ml-2" onClick={this.handleColourClick}>
                                                            <ColorLens style={{color: this.state.settings.themeColor}}/>
                                                        </IconButton>
                                                        <div className={this.state.displayColourPicker} >
                                                            <div className="colorPicker" >
                                                                <SketchPicker color={this.state.settings.themeColor} onChange={this.handleColourChange} onChangeComplete={this.handleColourClick} />
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={4} />

                                                    <Grid item xs={4} />
                                                    <Grid item xs={2} className="vcenterParent text-left">
                                                        <Typography variant="subtitle2" className="vcenterChild">
                                                            Logo:
                                                        </Typography>
                                                    </Grid>
                                                        
                                                    <Grid item xs={2}>
                                                        {this.state.settings.logoImage !== '' 
                                                            ?
                                                            
                                                            <img src={this.state.settings.logoImage} alt="logo-preview" className="settingsLogoPreview" /> 
                                                            
                                                            : 
                                                            
                                                            <DropzoneArea
                                                                onChange={this.handleLogo}
                                                                dropzoneText={''}
                                                                filesLimit={1}
                                                                acceptedFiles={['image/*']}
                                                                dropzoneClass={'settingsDropZone'}
                                                                showPreviews={false}
                                                                showPreviewsInDropzone={false}
                                                                showFileNames={true}
                                                            />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={4} />
                                                </Grid>
                                                
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid item xs={12} className="vcenterParent  mb-3 mt-3">
                                                    <Typography variant="h6" className="vcenterChild text-center w-100 text-muted">
                                                        Notification Settings
                                                    </Typography>
                                                </Grid>
                                                Interval
                                                MinTemp
                                                MaxTemp
                                                GatheringThreshold
                                            </Grid>
                                            <Grid item xs={3} />
                                            <Grid item xs={6}>
                                                <Button
                                                    type="button"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className="mt-3"
                                                    onClick={(): void => this.props.saveSettings(this.state.settings)}
                                                >
                                                    Save
                                                </Button>
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

