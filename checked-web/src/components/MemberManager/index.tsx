import React from 'react';
import { Grid, List, ListItem, ListItemAvatar, Typography, Card, IconButton, Button, Avatar, TextField, CardContent, CardHeader, Divider, Tooltip, Chip } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IMember, ILink, IUser } from '../../types';
import { Person, ArrowForwardIos, Add, PersonAdd } from '@material-ui/icons';
import { MemberService } from '../../api/MemberService';
import CommentBox from './comments/commentBox';
import { CommentService } from '../../api/CommentService';
import UseAnimations from 'react-useanimations';
import { LinkService } from '../../api/LinkService';
import { UserService } from '../../api/UserService';
import LightGraph from '../Overseer/LightGraph/LightGraph';



interface IState {
    currentMember: number;
    firstName: string;
    lastName: string;
    overseers: Array<ILink>;
    comments: Array<any>;
    users: Array<IUser>;
    editingComment: boolean;
    loadingComments: boolean;
    chaningMember: boolean;
    loadingOverseers: boolean;
    selectedOverseer: number;
}
interface IProps {
    members: Array<IMember>;
    userID: number;
}

class MemberManager extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            currentMember: -1,
            firstName: '',
            lastName: '',
            overseers: [],
            comments: [],
            users: [],
            editingComment: false,
            loadingComments: false,
            chaningMember: false,
            loadingOverseers: false,
            selectedOverseer: 0
        };
        this.setCurrentMember = this.setCurrentMember.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.setAddNewMember = this.setAddNewMember.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.addComment = this.addComment.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.displayComments = this.displayComments.bind(this);
        this.createLink = this.createLink.bind(this);
        this.createChart = this.createChart.bind(this);
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

        this.setState({ currentMember: memberID, firstName: currentMember.firstName, lastName: currentMember.lastName, comments: [], editingComment: false });
        // setTimeout()
        this.getFeedList(memberID);
        this.getOverseers(memberID);
        this.getUsers();
    }

    setAddNewMember(): void {
        this.setState({ firstName: '', lastName: '' });
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
            this.setState({ currentMember: -4, firstName: '', lastName: '' });
        }).catch(() => {
            this.setState({ currentMember: -3 });
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

    formatAMPM(date: Date): string {
        let hours = date.getHours();
        let minutes: any = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ampm;
        return strTime;
    }

    async getOverseers(memberID: number): Promise<void> {
        this.setState({ loadingOverseers: true });
        const overseers = await LinkService.getOverseersByMember(memberID);
        this.setState({ overseers: overseers.result, loadingOverseers: false });
    }

    async getUsers(): Promise<void> {
        const users = await UserService.getAllUsers();
        this.setState({ users: users.result, loadingOverseers: false });
    }

    renderOverseers(): Array<JSX.Element> {
        const overseers: Array<JSX.Element> = [];

        if (this.state.overseers.length === 0) {
            overseers.push(
                <Grid item xs={12} className="pb-3">
                    <Typography variant="caption">
                        No assigned overseers.
                    </Typography>
                </Grid>
            );
            return overseers;
        }


        this.state.overseers.forEach((link) => {
            const user = this.state.users.find((user) => user.userId === link.userId);
            overseers.push(
            <Grid item>
                    <Chip
                        className="overseer"
                        color="primary"
                        label={user?.email}
                        onDelete={(): Promise<void> => this.deleteLink(link.linkId)}
                    />
            </Grid>
                    
            );
        });

        return overseers;
    }

    async getFeedList(memberID: number): Promise<void> {
        this.setState({ loadingComments: true });
        const serverInfo = await CommentService.getComments(memberID.toString());

        serverInfo.forEach((comment: { new: boolean }) => {
            comment.new = false;
        });

        this.setState({ comments: serverInfo, loadingComments: false });
    }

    displayComments(): Array<JSX.Element> {

        if (!this.state.loadingComments) {

            const commentsTmp: JSX.Element[] = [];

            // if(!this.state.editingComment){
            this.state.comments.forEach(comment => {

                const dateTmp = new Date(comment.createdAt * 1000);
                const date = dateTmp.getDate(); //Current Date
                const month = dateTmp.getMonth() + 1; //Current Month
                const year = dateTmp.getFullYear(); //Current Year

                let timeStamp = "";
                if (comment.new) {
                    timeStamp = "New Comment";
                }
                else {
                    timeStamp = this.formatAMPM(dateTmp) + ' ' + date + '/' + month + '/' + year;
                }


                commentsTmp[commentsTmp.length] = <CommentBox
                    key={comment.commentId}
                    dbid={comment.commentId}
                    radioVal={comment.rating.toString()}
                    textContent={comment.value}
                    new={comment.new}
                    timeStamp={timeStamp}
                    deleteThisComment={this.deleteComment}
                    saveThisComment={this.saveComment}
                    canDelete={true}
                    imageSrc = {comment.image}
                />;
            });

            // }

            if (commentsTmp.length > 0) {
                return (commentsTmp.reverse());
            }

            else {
                return ([<div style={{ textAlign: "center", marginTop: "20%" }}><p> You dont seem to have any comments, add some with the plus icon </p></div>]);
            }

        }
        else {
            return ([<div style={{ height: "500px" }}><UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} /></div>]);
        }

    }

    async deleteComment(commentBox: any): Promise<void> {

        if (commentBox != null) {

            const tempComments: any = [];

            this.state.comments.forEach(async commentBoxTmp => {

                if (commentBoxTmp.commentId !== commentBox.props.dbid) {
                    tempComments[tempComments.length] = commentBoxTmp;
                }
                else if (!commentBox.props.new) {
                    await CommentService.deleteComment(commentBox.props.dbid.toString());
                }
            });

            this.setState({ comments: tempComments, editingComment: false });

        }



    }

    addComment(): void {


        if (!this.state.editingComment) {

            const tempComments: any = this.state.comments;

            const newComment = {
                commentId: 0,
                rating: 0,
                value: "",
                new: true,
                image: undefined,
            };

            tempComments.push(newComment);

            this.setState({ comments: tempComments, editingComment: true });
        }
        else {
            alert("you can only add one comment at a time");
        }
    }

    async saveComment(commentBox: any): Promise<void> {
        const body = {
            memberId: this.state.currentMember,
            rating: parseInt(commentBox.state.radio),
            value: commentBox.state.commentVal,
            image: commentBox.state.image,
        };

        await CommentService.saveComment(body);


        this.setState({ comments: [] });
        await this.getFeedList(this.state.currentMember);

        const tempComments: any = [];

        this.state.comments.forEach(async commentBoxTmp => {
            if (commentBoxTmp.commentId !== commentBox.props.dbid) {
                tempComments[tempComments.length] = commentBoxTmp;
            }
        });

        this.setState({ comments: tempComments, editingComment: false });




    }

    async createLink(): Promise<void> {
        await LinkService.createLink(this.state.selectedOverseer, this.state.currentMember, 'Parent');
        this.getOverseers(this.state.currentMember);
    }

    async deleteLink(linkId: number): Promise<void> {
        await LinkService.deleteLink(linkId);
        this.getOverseers(this.state.currentMember);
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
        if (this.state.currentMember === -1) {
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
                        Something went wrong.<br />Please try again.
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
        } else if (this.state.currentMember === -2) {
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
                <div className="w-100 h-100">
                    <Grid container spacing={2} className="p-4 h-100">
                        <Grid item xs={5} className="text-center border-right pr-5 memberList pb-5">
                            <Grid container spacing={1}>
                                <Grid item xs={12} className="mt-3 mb-3">
                                    <Avatar className="memberAvatar">
                                        <Person fontSize="large" className="w-100 h-100 m-1" />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        Member ID: {this.state.currentMember}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} className="mt-2">
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
                                <Grid item xs={6} className="mt-2">
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
                                <Grid item xs={12} className="mb-2">
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

                                <Grid item xs={12} className="mt-1">
                                    <Typography variant="subtitle2" className="mb-4 pt-4 border-top text-center">
                                        Overseers
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {this.renderOverseers()}
                                    </Grid>
                                </Grid>
                                <Grid item xs={10} className=" mb-4">
                                    <Autocomplete
                                        options={this.state.users}
                                        getOptionLabel={(option: IUser): string => 'UserID: ' + option.userId.toString()}
                                        renderInput={(params: any): any => (
                                            <TextField
                                                {...params}
                                                label="Select User"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                onBlur={(event: any): void => {
                                                    const value = event.target.value.split(' ')[1];
                                                    this.setState({selectedOverseer: Number(value) });
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2} className="vcenterParent mb-4">
                                    <Tooltip title="Asign new Overseer" className="vcenterChild mt-1">
                                        <IconButton style={{ backgroundColor: '#dddddd09' }} onClick={this.createLink} color="primary" className="overseerAdd">
                                            <Add />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>

                                <Grid item xs={12} className="pt-1 border-top">
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        className="mt-5 memberDeleteBtn "
                                        onClick={(): void => this.handleDeleteUser(this.state.currentMember)}
                                    >
                                        Delete Member
                                    </Button>
                                </Grid>
                                <Grid item xs={12} className="d-none">
                                    {this.createChart()}
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={7} >
                            {/* Comment feed here */}
                            {/* <div style={{width:"100%", height:"calc(100% - 500px)", backgroundColor:"red"}}> */}
                                
                               
                                <CardHeader title={"Comment Feed"} action={
                                    
                                    <IconButton >
                                        <Add onClick={this.addComment} />
                                    </IconButton>
                                } />
                                <Divider />
                                    <CardContent >
                                        <List className="pr-3 pl-2 commentList" style={{ width: "100%"}}>
                                            {this.displayComments()}
                                        </List>
                                    </CardContent>          
                                
                            {/* </div> */}
                           

                        </Grid>
                    </Grid>
                </div>
            );
        }
    }

    createChart(): JSX.Element {

        const data: number[] = [];
        const dates: string[] = [];

        let score = 0;

        this.state.comments.forEach(comment => {

            const rating = comment.rating;

            if (rating === 1) { // red
                score = score + -2;
            }
            else if (rating === 2) { // amber
                score = score + 0;
            }

            else if (rating === 3) { // amber
                score = score + 1;
            }
            console.log(score);

            data.push(score);
            dates.push(this.formatAMPM(new Date(comment.createdAt * 1000)));
        });
        console.log(data);
        console.log("Rendering");
        const graph = <LightGraph

            dates={dates}
            height={"200"}
            series={[
                {
                    name: "Score",
                    data: data
                }
            ]}

        />;

        

        return (graph);
    }

    

    

    render(): JSX.Element {

        return (
            <Grid container spacing={0} className="memberManager mt-3">
                <Grid item xs={2} className="border-right border-muted minw-250px">
                    <List className="pr-3 pl-2 memberList">
                        <ListItem alignItems="center" className="border-bottom border-muted p-0">
                            <Button onClick={this.setAddNewMember} className="w-100 h-100 p-3">
                                <ListItemAvatar>
                                    <PersonAdd className="mr-3" />
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
                                        <Add className="vcenterChild ml-2" fontSize="small" />
                                    </Grid>
                                </Grid>
                            </Button>
                        </ListItem>
                        {this.getMembersList()}
                    </List>
                </Grid>
                <Grid item xs={10} className="p-2 pl-4">
                    {this.getSelectedMember()}
                </Grid>
            </Grid>
        );
    }
}

export default MemberManager;
