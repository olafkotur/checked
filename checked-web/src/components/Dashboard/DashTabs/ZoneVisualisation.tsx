
import React from 'react';
import { MemberService } from '../../../api/MemberService';
import { IZone } from '../../../types';
import { Grid, Typography, List, ListItem, ListItemAvatar } from '@material-ui/core';
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
    type: 'temperature' | 'location';
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

    populateTempZones(): Array<JSX.Element> {
        const tempRenderedZones: Array<JSX.Element> = [];
        this.props.zoneData.forEach((zone, index) => {
            tempRenderedZones.push(
                <Zone zone={zone} type='temperature' key={index} userID={this.props.userID} />
            );
        });
        return tempRenderedZones;
    };

    populateLocationZones(): Array<JSX.Element> {
        const tempRenderedZones: Array<JSX.Element> = [];
        this.props.zoneData.forEach((zone, index) => {
            tempRenderedZones.push(
                <Zone zone={zone} type='location' key={index} userID={this.props.userID} reading={this.props.locationData.filter((member: any) => member.zoneId === zone.zoneId).length} />
            );
        });
        return tempRenderedZones;
    }

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
                <ListItem alignItems="center" className="border-bottom border-muted" key={member.memberId}>
                    <ListItemAvatar>
                        <Person />
                    </ListItemAvatar>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>

                            <Typography component="span" variant="body2" color="textPrimary">{thisMember.firstName || ''} {thisMember.lastName || ''}</Typography>
                        </Grid>
                        <Grid item xs={12}>

                            <Typography component="span" variant="body2" color="textPrimary">Zone ID:  {member.zoneId} </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            );
        });
        return membersList;
    }

    render(): JSX.Element {

        let renderedZones: Array<JSX.Element> = [];

        if (this.props.type === 'temperature') {
            renderedZones = this.populateTempZones();
        } else if (this.props.type === 'location') {
            renderedZones = this.populateLocationZones();
        }
        return (
            <Grid container spacing={0}>
                <Grid item xs={10}>
                    <div className="zoneVisContainer h-100 w-100">
                        {renderedZones}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h6" className="ml-1 mt-1 fontMontserrat text-right border-bottom border-muted" >
                        Members
                    </Typography>
                    <List className="membersList mt-2 mb-2">
                        {this.getMembersList()}
                    </List>
                </Grid>

            </Grid>

        );
    }



}

export default ZoneVisualisation;