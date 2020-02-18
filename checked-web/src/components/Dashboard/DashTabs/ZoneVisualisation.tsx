
import React from 'react';
import { MemberService } from '../../../api/MemberService';
import { IZone } from '../../../types';
import { Grid, Typography, List, ListItem, ListItemAvatar, Paper } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import Zone from './Zone';
interface IState {
    zoneData: Array<IZone>;
    popoverArray: Array<any>;
    anchorArray: Array<(HTMLElement | null)>;
    members: Array<any>;
}

interface IProps {
    zoneData: Array<IZone>;
    userID: number;
    locationData: Array<any>;
}


class ZoneVisualisation extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        const popoverArray: Array<boolean> = [];
        const anchorArray: Array<(HTMLElement | null)> = [];
        props.zoneData.forEach((zone: IZone, index: number) => {
            popoverArray[index] = false;
            anchorArray[index] = null;
        });

        this.state = { zoneData: this.props.zoneData, popoverArray, anchorArray, members: [] };
    }

    componentDidMount(): void {
        MemberService.getAllMembersByUser(this.props.userID).then((res: any) => {
            this.setState({ members: res.result });
        });
    }

    populateZones(): Array<JSX.Element> {
        const renderedZones: Array<JSX.Element> = [];
        this.props.zoneData.forEach((zone, index) => {
            renderedZones.push(
                <Zone zone={zone} key={index} userID={this.props.userID} />
            );
        });
        return renderedZones;
    };

    getMembersList(): Array<JSX.Element> {
        const membersList: Array<JSX.Element> = [];
        this.props.locationData.forEach((member: any) => {
            let thisMember = this.state.members.find((mem: any) => mem.memberId === member.memberId);
            
            if(thisMember === undefined){
                thisMember = {
                    firstName: '',
                    lastName: ''
                };
            };


            membersList.push(
                <ListItem alignItems="center" className="memberList border-bottom border-muted" key={member.memberId}>
                    <ListItemAvatar>
                        <Person />
                    </ListItemAvatar>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>

                            <Typography component="span" variant="body2" color="textPrimary">{thisMember.firstName || ''} {thisMember.lastName || ''}</Typography>
                        </Grid>
                        <Grid item xs={12}>

                            <Typography component="span" variant="body2" color="textPrimary"><i>Zone:</i>  {this.state.zoneData.find((zone: IZone) => {return zone.zoneId === member.zoneId;})?.name || ('Zone ID: ' + member.zoneId)} </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            );
        });
        return membersList;
    }

    render(): JSX.Element {

        const renderedZones: Array<JSX.Element> = this.populateZones();

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <div className="zoneVisContainer">
                        {renderedZones}
                        <Paper elevation={0} variant="outlined" className="dashMemberList mt-3 mb-3">
                            <Typography variant="subtitle1" className="pl-3 mt-2 pb-2 w-100 border-bottom">
                                <i>Active Members</i>
                            </Typography>
                            <List className="h-100 memberList dashMemberHeight">
                                {this.getMembersList()}
                            </List>
                        </Paper>
                    </div>
                </Grid>
            </Grid>

        );
    }



}

export default ZoneVisualisation;