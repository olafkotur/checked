import React from 'react';

// import BackgroundGrid from '../../components/MapEditor/BackgroundGrid';
import { RouteComponentProps } from '@reach/router';
import { Card, CardHeader, CardContent, IconButton, Divider, Tooltip } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import "../../components/MapEditor/CSS/EditorCard.css";
import { Add, GridOn, Delete, ColorLens, Save } from '@material-ui/icons';
import ZoneBlock from '../../components/MapEditor/ZoneBlock';
import { ZoneService } from '../../api/ZoneService';
import '../../components/MapEditor/InteractJS/DragZone.js';

import {checkCollision} from '../../components/MapEditor/collisionDetection';
import BgColumn from '../../components/MapEditor/BgColumn';
import BgRow from '../../components/MapEditor/BgRow';
import { ActivityService } from '../../api/ActivityService';
import { SketchPicker } from 'react-color';


interface IState {
    zones: Array<any>;
    col: Array<any>;
    row: Array<any>;
    selectedZone?: any;
    pickerColor: any;
    displayColorPicker: any;
}



interface IProps {
    userID: number;
}

interface IProps extends RouteComponentProps {
    userID: number;
}

class MapEditor extends React.Component<IProps, IState> {


    constructor(props: any) {
        super(props);
        this.state = { zones: [], col: [], row: [], pickerColor: "#FF9E00", displayColorPicker: "d-none" };
        this.clearZones = this.clearZones.bind(this);
        this.newZone = this.newZone.bind(this);
        this.genBg = this.genBg.bind(this);
        this.save = this.save.bind(this);
        this.setSelectedZone = this.setSelectedZone.bind(this);
        this.deleteZone = this.deleteZone.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);
        this.determineTextColor = this.determineTextColor.bind(this);
        this.hexToRgb = this.hexToRgb.bind(this);
    }

    componentDidMount(): void {
        this.loadZones();
        this.genBg();
    }

    componentWillUnmount(): void {
        this.clearZones();
    }

    setSelectedZone(zone: any): void {
        this.setState({ selectedZone: zone });
        // this.setState({ pickerColor: zone.state.backgroundColor.hex });
    }

    handleColorChange = (color: any): void => {
        if (this.state.selectedZone != null) {
            this.setState({ pickerColor: color });
            this.state.selectedZone.setBackground(color);
            // this.state.selectedZone.setTextColor(this.determineTextColor(color));
        }
       
    };

    handleColorClick = (): void => {
        if (this.state.displayColorPicker === "") {
            this.setState({ displayColorPicker: "d-none" });
        }
        else {
            this.setState({ displayColorPicker: "" });
        }
    };

    genBg(): void {
        const loop = Math.floor((window.innerWidth / 25) - 4);
        const tempCols = this.state.col;
        const tempRows = this.state.row;

        for (let i = 0; i < loop; i++) {
            tempCols[tempCols.length] = <BgColumn key={"Col" + i} />;
        }

        const loop2 = (Math.floor(window.innerHeight / 25) - 7);
        for (let i = 0; i < loop2; i++) {
            tempRows[tempRows.length] = <BgRow key={"Row" + i} />;

        }

        this.setState({ row: tempRows });
        this.setState({ col: tempCols });
    }




    async newZone(): Promise<void> {
        //    console.log(this.props);
        const dbid = await ZoneService.createZone((this.state.zones.length + 1).toString(), 100, 100, 0, 0, "rgb(255, 158, 0)", this.props.userID);
        const pos = {
            width: 100,
            height: 100,
            xValue: 0,
            yValue: 0,
        };
        const tempZones = this.state.zones;
        tempZones[tempZones.length] = <ZoneBlock
            key={(this.state.zones.length + 1).toString()}
            name={"Zone " + (this.state.zones.length + 1).toString()}
            id={(this.state.zones.length + 1)}
            dbid={dbid} pos={pos}
            activity=""
            backgroundColor="rgb(255, 158, 0)"
            setSelectedZone={this.setSelectedZone}
            textColor="white"
        />;

        this.setState({ zones: tempZones });
    }

    async save(): Promise<void> {
        console.log("saving now");
        const zones = document.getElementsByClassName("zoneBlock");
        // checks if the zones are not overlapping (reused from 330)
        if (checkCollision(zones) === false) {
            for (let i = 0; i < zones.length; i++) {
                // Uses HTML Div
                const zone = zones[i];
                const rect = zone.getBoundingClientRect();
                const backgroundStyle = window.getComputedStyle(zone, null).getPropertyValue("background-color");
                const id = zone.getAttribute('data-dbid');
                const activity = zone.getAttribute('data-activity');
                if (id != null && activity != null) {
                    const activitiesDB = await ActivityService.getAllActivitiesForZone(parseInt(id));
                    // console.log(activitiesDB.result[0].activityId);
                    // Create Json
                    if (activity === '') {
                        // console.log('empty activity');
                        if (activitiesDB.result.length > 0) {
                            // console.log('delete activity');
                            const activityID = activitiesDB.result[0].activityId;
                            await ActivityService.deleteActivity(parseInt(activityID));
                        } else {
                            // console.log('do nothing');
                        }

                    }
                    else {
                        // user added an activity
                        // console.log(activity);
                        if (activitiesDB.result.length === 0) {
                            // console.log('add activity');
                            await ActivityService.createActivity(activity, parseInt(id));
                        }
                        else {
                            // console.log('update activity');
                            const activityID = activitiesDB.result[0].activityId;
                            await ActivityService.deleteActivity(parseInt(activityID));
                            await ActivityService.createActivity(activity, parseInt(activityID));
                        }

                    }


                    const zoneJson = {
                        userId: this.props.userID,
                        name: zone.id,
                        width: rect.width,
                        height: rect.height,
                        xValue: rect.x - 75,
                        yValue: rect.y - 199, // This will need to change if you change elements above the editor
                        color: backgroundStyle
                    };

                    // console.log(rect.x);

                    await ZoneService.updateZone(zoneJson, parseInt(id));
                }
            }
        }
        else {
            alert("zones cannot intersect, your work has NOT been saved");
        }
    }

    async loadZones(): Promise<void> {
        const response = await ZoneService.loadZonesByUser(this.props.userID);
        for (let i = 0; i < response.result.length; i++) {
            await this.buildZone(response.result[i]);
        }
    }

    clearZones(): void {
        this.setState({ zones: [] });
    }

    deleteZone(): void {
        console.log('deleteing zone');
        if (this.state.selectedZone != null) {

            const selectedZone = this.state.selectedZone;

            const tempZones: any = [];

            for (let i = 0; i < this.state.zones.length; i++) {
                const zone = this.state.zones[i];

                if (zone.props.dbid !== selectedZone.props.dbid) {
                    tempZones[tempZones.length] = zone;
                }
            }
            this.setState({ zones: tempZones });
            ZoneService.deleteZone(selectedZone.props.dbid);

        }

    }

    determineTextColor(color: any): string{
  
        let rgb = color;

        rgb = rgb.replace(/[^\d,]/g, '').split(',');

        const red = parseInt(rgb[0]);
        const green = parseInt(rgb[1]);
        const blue = parseInt(rgb[2]);
        console.log(red);
        console.log(green);
        console.log(blue);

        if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
            console.log("Black");
            return "rgb(0, 0, 0)";
        }
        else {
            console.log("White");
            return "rgb(255, 255, 255)";
        }
        
    }

   hexToRgb(hex: string): any {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    async buildZone(DBZone: any): Promise<void> {

        // console.log(DBZone);

        const pos = {
            width: DBZone.width,
            height: DBZone.height,
            xValue: DBZone.xValue,
            yValue: DBZone.yValue,
        };

        let activity = '';

        const activitiesDB = await ActivityService.getAllActivitiesForZone(parseInt(DBZone.zoneId));
        // console.log(activitiesDB);

        if (activitiesDB.result.length > 0) {
            // console.log(activitiesDB.result[0].name);
            activity = activitiesDB.result[0].name;
        }
console.log(DBZone);
        const tempZones = this.state.zones;
        tempZones[tempZones.length] = <ZoneBlock
            key={(tempZones.length + 1).toString()}
            name={DBZone.name}
            id={(tempZones.length + 1)}
            dbid={DBZone.zoneId}
            pos={pos}
            activity={activity}
            setSelectedZone={this.setSelectedZone}
            backgroundColor={DBZone.color}
            
            textColor = {this.determineTextColor(DBZone.color)}
        />;
        this.setState({ zones: tempZones });
    }

    render(): JSX.Element {

        const presetCol = [
            '#FF9E00',
            '#F5A623',
            '#F8E71C',
            '#8B572A',
            '#7ED321',
            '#417505',
            '#BD10E0',
            '#9013FE',
            '#4A90E2',
            '#50E3C2',
            '#B8E986',
            '#000000',
            '#4A4A4A',
            '#9B9B9B',
            '#FFFFFF'
        ];

        return (
            <Card className="editorCard" id="editorCard">
                <CardHeader title="Map Editor" avatar={<GridOn className="w-100 h-100" />} className="mutedBlack mt-2">
                </CardHeader>

                <Divider />

                <Toolbar className="cardToolbar pt-2 pb-2">

                    <Tooltip title="Add Zone">
                        <IconButton edge="start" size='small' onClick={this.newZone} aria-label="Add new zone" className="ml-3">
                            <Add />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Colour Picker">
                        <IconButton size='small' aria-label="Change color" className="ml-2" onClick={this.handleColorClick}>
                            <ColorLens/>
                        </IconButton>
                    </Tooltip>



                    <Divider orientation="vertical" variant="middle" />
                  
                    <Tooltip title="Delete Zone">
                        <IconButton size='small' onClick={this.deleteZone} aria-label="Clear zones">
                            <Delete />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Save Layout">
                        <IconButton size='small' onClick={this.save} aria-label="Save" className="ml-2">
                            <Save />
                        </IconButton>
                    </Tooltip>

                </Toolbar>
                <Divider />
                <CardContent className="editorContent">
                    {/* <BackgroundGrid /> */}
                    <div className="BgContainer" key="BGC">
                        <div className="colsDiv" key="ColsDiv">
                            {this.state.col}
                        </div>
                        <div className="colsDiv" key="RowsDiv">
                            {this.state.row}
                        </div>

                    </div>
                    <div className={this.state.displayColorPicker}>
                        <div className="colorPicker">
                            <SketchPicker presetColors={presetCol} color={this.state.pickerColor} onChange={this.handleColorChange} />
                        </div>
                    </div>



                    <div className="mainEditor" id="mainEditor">
                        
                        {this.state.zones}

                    </div>

                </CardContent>
            </Card>
        );
    }
};


export default MapEditor;
