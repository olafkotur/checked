import React from 'react';
import { Grid, List, ListItem, ListItemAvatar, Typography, Card, IconButton, Button, Avatar, TextField } from "@material-ui/core";
import { IMember } from '../../types';
import { Person, ArrowForwardIos, Add, PersonAdd } from '@material-ui/icons';
import {MemberService} from '../../api/MemberService';

interface IState {
    currentMember: number;
    firstName: string;
    lastName: string;
}

interface IProps {
    members: Array<IMember>;
    userID: number;
}

class MemberManager extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = { currentMember: -1, firstName: '', lastName: '' };
        this.setCurrentMember = this.setCurrentMember.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.setAddNewMember = this.setAddNewMember.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
    }

    setCurrentMember(memberID: number): void {
        let currentMember = this.props.members.filter((member) => member.memberId === memberID)[0];
        if (currentMember === undefined) {
            currentMember = {
                memberId: -1,
                userId: this.props.userID,
                firstName: '',
                lastName: '',
                createdAt: 0,
                lastUpdated: 0,
            };
        }
        this.setState({currentMember: memberID, firstName: currentMember.firstName, lastName: currentMember.lastName});
    }

    setAddNewMember(): void {
        this.setState({firstName: '', lastName: ''});
        this.setCurrentMember(-2);
    }

    handleFirstName(event: any): void {
        this.setState({ firstName: event.target.value });
    };

    handleLastName(event: any): void {
        this.setState({ lastName: event.target.value });
    };

    handleCreateUser(): void {
        MemberService.createMember(this.props.userID, this.state.firstName, this.state.lastName).then((res) => {
            console.log(res);
            this.setState({currentMember: -4, firstName: '', lastName: ''});
        }).catch(() => {
            this.setState({currentMember: -3});
        });
    }

    handleUpdateUser(): void {
        console.log('UPDATE MEME');
    }

    handleDeleteUser(memberID: number): void {
        MemberService.deleteMember(memberID).then((res) => {
            this.setState({ currentMember: -5 });
        }).catch(() => {
            this.setState({ currentMember: -3 });
        });
    }

    getMembersList(): Array<JSX.Element> {
        const membersList: Array<JSX.Element> = [];
        this.props.members.forEach((member: any) => {
            membersList.push(
                <ListItem alignItems="center" className="border-bottom border-muted p-0" key={member.memberId}>
                    <Button onClick={(): void => this.setCurrentMember(member.memberId)} className="w-100 h-100 p-2">
                        <ListItemAvatar>
                            <Person />
                        </ListItemAvatar>
                        <Grid container spacing={0}>
                            <Grid item xs={10}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>

                                        <Typography variant="body1" align="left" color="textPrimary">{member.firstName || ''} {member.lastName || ''}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" align="left" color="textPrimary">Member ID:  {member.memberId} </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} className="pl-1">
                                <ArrowForwardIos className="vcenterChild p-1 mr-5" fontSize="small" />
                            </Grid>
                        </Grid>
                    </Button>
                </ListItem>
            );
        });
        return membersList;
    }

    getSelectedMember(): JSX.Element {
        if(this.state.currentMember === -1){
            return (
                <div className="w-100 h-100 vcenterParent">
                    <Typography variant="h6" className="fontMontserrat vcenterChild w-100 text-center">
                        Choose a member from the list to edit their details.
                    </Typography>
                </div>
            );
        } else if (this.state.currentMember === -3) {
            return (
                <div className="w-100 h-100 vcenterParent">
                    <Typography variant="h6" className="fontMontserrat vcenterChild w-100 text-center">
                        Something went wrong.<br/>Please try again.
                    </Typography>
                </div>
            );
        } else if (this.state.currentMember === -4) {
            return (
                <div className="w-100 h-100 vcenterParent">
                    <Typography variant="h6" className="fontMontserrat vcenterChild w-100 text-center">
                        New member created successfully.
                    </Typography>
                </div>
            );
        } else if (this.state.currentMember === -5) {
            return (
                <div className="w-100 h-100 vcenterParent">
                    <Typography variant="h6" className="fontMontserrat vcenterChild w-100 text-center">
                        Member successfully deleted.
                    </Typography>
                </div>
            );
        } else if(this.state.currentMember === -2){
            return (
                <Card className="w-100 h-100" raised>
                    <Grid container spacing={0}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6} className="text-center">
                            <Grid container spacing={3}>
                                <Grid item xs={12} className="mt-5 mb-3">
                                    <Avatar className="memberAvatar">
                                        <Person fontSize="large" className="w-100 h-100 m-1"/>
                                    </Avatar>
                                </Grid>
                                <Grid item xs={12} className="mt-5">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstNameAdd"
                                        label="First Name"
                                        name="firstName"
                                        onChange={this.handleFirstName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastNameAdd"
                                        label="Last Name"
                                        name="lastName"
                                        onChange={this.handleLastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="mt-3"
                                        onClick={this.handleCreateUser}
                                    >
                                        Add Member
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </Card>
            );
        } else {
            return (
                <Card className="w-100 h-100" raised>
                    <Grid container spacing={0}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6} className="text-center">
                            <Grid container spacing={3}>
                                <Grid item xs={12} className="mt-5 mb-3">
                                    <Avatar className="memberAvatar">
                                        <Person fontSize="large" className="w-100 h-100 m-1" />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        Member ID: {this.state.currentMember}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className="mt-2">
                                    <TextField
                                        variant="outlined"
                                        value={this.state.firstName}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        onChange={this.handleFirstName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={this.state.lastName}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        onChange={this.handleLastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="mt-3"
                                        onClick={this.handleUpdateUser}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        className="mt-3 memberDeleteBtn"
                                        onClick={(): void => this.handleDeleteUser(this.state.currentMember)}
                                    >
                                        Delete Member
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </Card>
            );
        }
    }

    render(): JSX.Element {

        return (
            <Grid container spacing={0} className="memberManager mt-3">
                <Grid item xs={3} className="border-right border-muted">
                    <List className="pr-3 pl-2 overflow-scroll">
                        <ListItem alignItems="center" className="border-bottom border-muted p-0">
                            <Button onClick={this.setAddNewMember} className="w-100 h-100 p-3">
                                <ListItemAvatar>
                                    <PersonAdd className="mr-3"/>
                                </ListItemAvatar>
                                <Grid container spacing={0}>
                                    <Grid item xs={10}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12}>
                                                <Typography variant="body1" align="left" color="textPrimary">Add New Member</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} className="pl-1">
                                        <Add className="vcenterChild mr-4" fontSize="small" />
                                    </Grid>
                                </Grid>
                            </Button>
                        </ListItem>
                        {this.getMembersList()}
                    </List>
                </Grid>
                <Grid item xs={9} className="p-2 pl-4">
                    {this.getSelectedMember()}
                </Grid>
            </Grid>
        );
    }
}

export default MemberManager;