import React from 'react';

// import BackgroundGrid from '../../components/MapEditor/BackgroundGrid';
import { RouteComponentProps } from '@reach/router';
import { Card, CardHeader, CardContent,  IconButton, Divider } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import "../../components/MapEditor/CSS/EditorCard.css";
import { Add, GridOn, Delete, ColorLens, Save } from '@material-ui/icons';
import ZoneBlock from '../../components/MapEditor/ZoneBlock';
import { ZoneService } from '../../api/ZoneService';
import '../../components/MapEditor/InteractJS/DragZone.js';
import checkCollision from '../../components/MapEditor/collisionDetection';
import BgColumn from '../../components/MapEditor/BgColumn';
import BgRow from '../../components/MapEditor/BgRow';


interface IState {
    zones: Array<any>;
    col: Array<any>;
    row: Array<any>;
}



interface IProps {
    userID: number;
}

interface IProps extends RouteComponentProps{
    userID: number;
}

class MapEditor extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { zones: [], col: [], row: []};
        this.clearZones = this.clearZones.bind(this);
        this.newZone = this.newZone.bind(this);
        this.genBg = this.genBg.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount(): void {
        this.loadZones();
        this.genBg();
    }

    componentWillUnmount(): void {
        this.clearZones();
    }

    genBg(): void {
        const loop = Math.floor((window.innerWidth / 25) - 4);

        for (let i = 0; i < loop; i++) {
            this.state.col[this.state.col.length] = <BgColumn key={"Col" + i} />;

        }
        const loop2 = (Math.floor(window.innerHeight / 25) - 7);
        for (let i = 0; i < loop2; i++) {
            this.state.row[this.state.row.length] = <BgRow key={"Row" + i} />;

        }
    }

  


    async newZone(): Promise<void> {
        console.log(this.props);
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
                                        activity = ""
                                        />;
        
        this.setState({zones: tempZones});
        // ReactDOM.render(
        //     <div id="blocksContainer">
        //         {this.state.zones}
        //     </div>,
        //     document.getElementById('mainEditor')
        // );
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
                // Create Json
                const zoneJson = {
                    userId: this.props.userID,
                    name: zone.id,
                    width: rect.width,
                    height: rect.height,
                    xValue: rect.x - 75,
                    yValue: rect.y - 150, // This will need to change if you change elements above the editor
                    color: backgroundStyle,
                };
                console.log(rect.x);
                // it should always not be null
                if (id != null) {
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
        console.log(response.result.length);
        for (let i = 0; i < response.result.length; i++) {
            this.buildZone(response.result[i]);
        }
    }

    clearZones(): void {
        this.setState({zones: []});
    }

    buildZone(DBZone: any): void {
        console.log(DBZone);
        const pos = {
            width: DBZone.width,
            height: DBZone.height,
            xValue: DBZone.xValue,
            yValue: DBZone.yValue,
        };
        console.log(DBZone.name)
        const tempZones = this.state.zones;
        tempZones[tempZones.length] = <ZoneBlock 
                                        key={(tempZones.length + 1).toString()} 
                                        name={DBZone.name} 
                                        id={(tempZones.length + 1)} 
                                        dbid={DBZone.zoneId} 
                                        pos={pos} 
                                        activity = "placeholder"
                                    />;
        this.setState({zones: tempZones});
    }
    
    render(): JSX.Element {

        return (
            <Card className="editorCard" id="editorCard">
                <CardHeader className = "editorHeader"title={<h1 className="editorCardTitle">Room Layout Editor</h1>} avatar={<GridOn fontSize = "large"  />}/>

                <Divider />

                <Toolbar className = "cardToolbar">
                    
                    <IconButton edge="start" size='small' onClick={this.newZone} aria-label="Add new zone">
                        <Add />
                    </IconButton>

                    <IconButton size='small' aria-label="Change color">
                        <ColorLens />
                    </IconButton>

                    <Divider orientation="vertical" variant="middle" />

                    <IconButton size='small' onClick={this.clearZones} aria-label="Clear zones">
                        <Delete />
                    </IconButton>

                    <IconButton size='small' onClick={this.save} aria-label="Save">
                        <Save />
                    </IconButton>
                   
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

                    <div className="mainEditor" id="mainEditor">
                        {this.state.zones}
                    </div>
                </CardContent>
            </Card>
        );
    }
};


export default MapEditor;
