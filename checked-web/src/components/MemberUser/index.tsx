import React from 'react';
import { Grid, List, Button, TextField, CardContent, CardHeader, Divider, AppBar, Tab, Tabs, Radio, RadioGroup, FormControlLabel, Avatar, Typography, Chip, IconButton } from "@material-ui/core";
import { IMember, IUser, ILink } from '../../types';
import CommentBox from '../MemberManager/comments/commentBox';
import { CommentService } from '../../api/CommentService';
// import UseAnimations from 'react-useanimations';
import { ConsentService } from '../../api/ConsentService';
import { Person, Add } from '@material-ui/icons';
import LightGraph from '../Overseer/LightGraph/LightGraph';
import { MemberService } from '../../api/MemberService';
import { LinkService } from '../../api/LinkService';
import { UserService } from '../../api/UserService';





interface IState {
    currentMember: number;
    firstName: string;
    lastName: string;

    comments: Array<any>;
    editingComment: boolean;
    loadingComments: boolean;
    loadingConsent: boolean;
    chaningMember: boolean;
    tabValue: number;

    consentType: string;
    consentForm: string;
    termsForm: string;
    privacyForm: string;
    consentAccepted: boolean;
    termsAccepted: boolean;
    privacyAccepted: boolean;
    loadingAccepted: boolean;

    overseers: Array<ILink>;
    users: Array<IUser>;
    loadingOverseers: boolean;
    selectedOverseerNum: number;
    selectedOverseer: any;
    overseerComments: Array<any>;
}
interface IProps {
    members: Array<IMember>;
    memberID: number;
}

class MemberUser extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentMember: -1,
            firstName: '',
            lastName: '',
            overseers: [],
            comments: [],
            editingComment: false,
            loadingComments: false,
            loadingConsent: false,
            chaningMember: false,
            tabValue: 0,


            consentType: "",
            consentForm: "Consent Here",
            termsForm: "Terms Here",
            privacyForm: "Privacy Here",
            consentAccepted: false,
            termsAccepted: false,
            privacyAccepted: false,
            loadingAccepted: false,

            users: [],
            loadingOverseers: false,
            selectedOverseerNum: 0,
            selectedOverseer: null,
            overseerComments: [],
        };

        this.deleteComment = this.deleteComment.bind(this);
        this.addComments = this.addComments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.displayComments = this.displayComments.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.displayTab = this.displayTab.bind(this);
        this.handleConsentToggle = this.handleConsentToggle.bind(this);
        this.handleAcceptConsent = this.handleAcceptConsent.bind(this);
        this.handleDeclineConsent = this.handleDeclineConsent.bind(this);
        this.displayConsent = this.displayConsent.bind(this);
        this.getConsent = this.getConsent.bind(this);
        this.decideConsent = this.decideConsent.bind(this);
        this.getAccepted = this.getAccepted.bind(this);
        this.renderOverseers = this.renderOverseers.bind(this);
        // console.log(this.props.memberID);
        this.getFeedList();
        this.getConsent();
        this.getMemberInfo();
        this.getAccepted();

        this.getUsers();
        this.getOverseers(this.props.memberID);

    }


    async getMemberInfo(): Promise<void> {

        const MemberInfo = await MemberService.getOneMember(this.props.memberID);
        //    console.log(MemberInfo);
        this.setState({
            firstName: MemberInfo.firstName,
            lastName: MemberInfo.lastName,
        });

    };


    changeTab(event: React.ChangeEvent<{}>, newValue: number): void {
        this.setState({ tabValue: newValue });
    };


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
            height={"300"}
            series={[
                {
                    name: "Score",
                    data: data

                }
            ]}


        />;
        return (graph);
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

    async getFeedList(): Promise<void> {
        this.setState({ loadingComments: true });
        const serverInfo = await CommentService.getComments(this.props.memberID.toString());
        serverInfo.forEach((comment: { new: boolean }) => {
            comment.new = false;
        });
        this.setState({ comments: serverInfo, loadingComments: false });
    }

    displayComments(): Array<JSX.Element> {

        // console.log(this.state.comments);

        if (!this.state.loadingComments) {

            const commentsTmp: JSX.Element[] = [];

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
                    canDelete={false}
                    imageSrc={comment.image}
                />;
            });

            if (commentsTmp.length > 0) {
                return (commentsTmp.reverse());
            }

            else {
                return ([<div style={{ textAlign: "center", marginTop: "20%" }}><p> You don't have any comments </p></div>]);
            }

        }
        else {
            // return ([<div style={{ height: "500px" }}><UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} /></div>]);
             return ([
            <div className="w-100 h-100 vcenterParent">
                <Typography variant="h6" className="fontMontserrat vcenterChild w-100 text-center">
                  Loading
                </Typography>
            </div>
            ]);
        }

    }

    async addComments(userId: number): Promise<void> {
        if (!this.state.editingComment) {

            const tempComments: any = await CommentService.getCommentsByUser(userId.toString());

            this.setState({ overseerComments: tempComments });
        }
        else {
            alert("you can only add one comment at a time");
        }
    }


    async getConsent(): Promise<void> {


        this.setState({ loadingConsent: true });
        const Consent = await ConsentService.getConsent();
        const TandC = await ConsentService.getConditions();
        const Privacy = await ConsentService.getPrivacy();
        // console.log(Consent);
        // console.log("-----------------------------");
        // console.log(TandC);
        // console.log("-----------------------------");
        // console.log(Privacy);
        this.setState({
            consentForm: Consent,
            termsForm: TandC,
            privacyForm: Privacy,
            loadingConsent: false,
        });


    }

    decideConsent(): string {
        return(this.decideConsentCalc(this.state.consentType, this.state.termsForm, this.state.privacyForm, this.state.consentForm));
    }

    decideConsentCalc(type: string, terms: string, privacy: string, consent: string, ): string { // refactored for jest
        if (type === "Terms") {
            return (terms);
        }
        else if (type === "Privacy") {
            return (privacy);
        }
        else if (type === "Consent") {
            return (consent);
        }
        else {
            return ("ERROR");
        }
    }

    handleConsentToggle = (event: any): void => {
        this.setState({ consentType: event.target.value });

    };

    async handleAcceptConsent(event: any): Promise<void> {
        await ConsentService.updateConsent(true, this.props.memberID, this.state.consentType);
        this.getAccepted();
    };

    async handleDeclineConsent(event: any): Promise<void> {
        await ConsentService.updateConsent(false, this.props.memberID, this.state.consentType);
        this.getAccepted();
    };

    determineAccepted(value: string): JSX.Element {

        if (!this.state.loadingAccepted) {
            if (value === "Consent") {
                if (this.state.consentAccepted) {
                    return (<div> Accepted </div>);
                }
                else {
                    return (<div> Not Accepted </div>);
                }
            }
            else if (value === "Privacy") {
                if (this.state.privacyAccepted) {
                    return (<div> Accepted </div>);
                }
                else {
                    return (<div> Not Accepted </div>);
                }
            }
            else if (value === "Terms") {
                if (this.state.termsAccepted) {
                    return (<div> Accepted </div>);
                }
                else {
                    return (<div> Not Accepted </div>);
                }
            }
            else {
                return (<div> Error </div>);
            }
        }
        else {
            return (<div> Loading </div>);
        }
    }
    async getAccepted(): Promise<void> {
        this.setState({ loadingAccepted: true });
        const Consent = await ConsentService.getConsentMember(this.props.memberID);
        this.setState({
            consentAccepted: Consent.isAccepted,
            loadingAccepted: false,
        });
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
                    
                    <Typography variant="caption" align="left" color="textPrimary">
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
                    <Typography variant="body1" align="left" color="textPrimary">
                    <Chip
                        className="overseer"
                        color="inherit"
                        label={user?.email}
                        onClick={() => this.changeOverseer(user)}
                        variant= "outlined"
                    /> 
                    </Typography>
                </Grid>

            );
        });

        return overseers;
    }

    changeOverseer(user: any): void {
        this.setState({ selectedOverseer: user, selectedOverseerNum: user.userId, overseerComments:[] });
        this.addComments(user.userId);
    }

    addComment(): void {


        if (!this.state.editingComment) {

            const tempComments: any = this.state.overseerComments;

            const newComment = {
                commentId: 0,
                rating: 0,
                value: "",
                new: true,
                image: undefined,
            };

            tempComments.push(newComment);

            this.setState({ overseerComments: tempComments, editingComment: true });
        }
        else {
            alert("you can only add one comment at a time");
        }
    }

    async saveComment(commentBox: any): Promise<void> {
        // console.log("Saving Now");


        const body = {
            userId: this.state.selectedOverseer.userId, //number
            memberId: this.props.memberID, //number
            rating: parseInt(commentBox.state.radio), //number
            value: commentBox.state.commentVal, // string
            image: commentBox.state.image, // string
        };

        // console.log(body);

        await CommentService.saveCommentForOverseer(body);


        this.setState({ overseerComments: [] });
        await this.getFeedList();

        const tempComments: any = [];

        this.state.overseerComments.forEach(async commentBoxTmp => {
            if (commentBoxTmp.commentId !== commentBox.props.dbid) {
                tempComments[tempComments.length] = commentBoxTmp;
            }
        });

        this.setState({ overseerComments: tempComments, editingComment: false });

    }

    async deleteComment(commentBox: any): Promise<void> {
        // console.log("i have been called");
        console.log("I shouldnt have been called in this file");
    }

    renderFeedback(): Array<JSX.Element> {

        if (this.state.selectedOverseerNum !== 0) {
            if (!this.state.loadingComments) {

                const commentsTmp: JSX.Element[] = [];

                // if(!this.state.editingComment){
                this.state.overseerComments.forEach(comment => {

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

                    
                    //TODO uncomment these
                    commentsTmp[commentsTmp.length] = <CommentBox
                        key={comment.commentId}
                        dbid={comment.commentId}
                        //  radioVal={comment.rating.toString()}
                        radioVal = "2"
                        textContent={comment.value}
                        new={comment.new}
                        timeStamp={timeStamp}
                        deleteThisComment={this.deleteComment}
                        saveThisComment={this.saveComment}
                        canDelete={false}
                        //  imageSrc={comment.image}
                        imageSrc={""}
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
                // return ([<div style={{ height: "500px" }}><UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} /></div>]);
                 return ([
            <div className="w-100 h-100 vcenterParent">
                <Typography variant="h6" className="fontMontserrat vcenterChild w-100 text-center">
                  Loading
                </Typography>
            </div>
            ]);
            }
        }
        else {
            return ([<div> Select and overseer to give feedback </div>]);
        }

    }


    displayConsent(): JSX.Element {
        // console.log(ConsentService.getConsent());
        if (!this.state.loadingConsent) {

            if (this.state.consentType === "") {
                return (
                    <div>  </div>
                );
            }
            else {

                return (
                    <div>
                        <TextField
                            id="outlined-basic"
                            value={this.decideConsent()}
                            label={this.state.consentType}
                            variant="outlined"
                            color="primary"
                            fullWidth={true}
                            disabled />

                        <Grid container spacing={2}>
                            <Grid item xs={6}>

                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className="mt-1 mb-3"
                                    onClick={this.handleDeclineConsent}
                                // disabled={!this.state.email.includes('@') || this.state.password.length < 6}
                                >
                                    Decline
                            </Button>



                            </Grid>

                            <Grid item xs={6}>

                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="mt-1 mb-3"
                                    onClick={this.handleAcceptConsent}
                                // disabled={!this.state.email.includes('@') || this.state.password.length < 6}
                                >
                                    Accept
                            </Button>



                            </Grid>



                        </Grid>
                    </div>
                );
            }

        }
        else {
            // return (<div style={{ height: "500px" }}><UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} /></div>);
            return (
                <div className="w-100 h-100 vcenterParent">
                    <Typography variant="h6" className="fontMontserrat vcenterChild w-100 text-center">
                        Loading
                </Typography>
                </div>
            );
        }
    };




    displayTab(): JSX.Element {
        // Feed
        if (this.state.tabValue === 0) {
            return (
                <Grid container spacing={3} className="memberManager mt-3">
                    <Grid item xs={6} >
                        <CardHeader title={"Comment Feed"} />
                        <Divider />
                        <CardContent >
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
                                {this.displayComments()}
                            </List>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6} >
                        <CardHeader title={"OverSeer Feedback"} action={
                            <IconButton disabled={this.state.selectedOverseerNum === 0 || this.state.editingComment} >
                                <Add onClick={this.addComment} />
                            </IconButton>
                        } />
                        <Divider />
                        <CardContent >
                            <Grid container xs={12} spacing={2}>
                                {this.renderOverseers()}
                            </Grid>
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }} >
                                {this.renderFeedback()}
                            </List>
                        </CardContent>
                    </Grid>
                </Grid>
            );
        }

        // Info
        else if (this.state.tabValue === 1) {
            const listGridWidth = 8;
            const acceptedGridWidth = 4;

            return (
                <Grid container spacing={3} className="memberManager mt-3">
                    <Grid item xs={12} >
                        {/* <CardHeader title={"Consent Toggle"} /> */}
                        {/* <Divider /> */}
                        <CardContent >
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>

                                <Grid container spacing={1} className="p-4 h-100">
                                    <Grid item xs={12} className="mt-3 mb-3">
                                        <Avatar className="memberAvatar">
                                            <Person fontSize="large" className="w-100 h-100 m-1" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">
                                            Member ID: {this.props.memberID}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className="mt-2">
                                        <Typography variant="subtitle2">
                                            Firstname: {this.state.firstName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className="mt-2">
                                        <Typography variant="subtitle2">
                                            Lastname: {this.state.lastName}
                                        </Typography>
                                    </Grid>



                                </Grid>

                                {this.createChart()}

                                {/* {this.createChart()} */}

                            </List>
                        </CardContent>
                    </Grid>

                </Grid>
            );
        }


        // consent forms
        else if (this.state.tabValue === 2) {
            const listGridWidth = 8;
            const acceptedGridWidth = 4;

            return (
                <Grid container spacing={3} className="memberManager mt-3">
                    <Grid item xs={6} >
                        {/* <CardHeader title={"Consent Toggle"} /> */}
                        {/* <Divider /> */}
                        <CardContent >
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
                                {/* {this.displayComments()} */}

                                <RadioGroup onChange={this.handleConsentToggle}  >

                                    <Grid container>
                                        <Grid item xs={listGridWidth} >
                                            <FormControlLabel value="Terms" control={<Radio color="primary" />} label="Terms & Conditions" />
                                        </Grid>
                                        <Grid item xs={acceptedGridWidth} >
                                            <Typography style={{ marginTop: 10 }}>
                                                {this.determineAccepted("Terms")}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={listGridWidth} >
                                            <FormControlLabel value="Privacy" control={<Radio color="primary" />} label="Privacy" />
                                        </Grid>
                                        <Typography style={{ marginTop: 10 }}>
                                            {this.determineAccepted("Privacy")}
                                        </Typography>
                                        <Grid item xs={listGridWidth} >
                                            <FormControlLabel value="Consent" control={<Radio color="primary" />} label="Consent" />
                                        </Grid>
                                        <Typography style={{ marginTop: 10 }}>
                                            {this.determineAccepted("Consent")}
                                        </Typography>
                                    </Grid>
                                </RadioGroup>
                            </List>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6} >
                        <CardContent >
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
                                {this.displayConsent()}

                            </List>
                        </CardContent>
                    </Grid>
                </Grid>
            );
        }


        // Settings
        else if (this.state.tabValue === 3) {
            return (
                <Grid container spacing={3} className="memberManager mt-3">
                    <Grid item xs={6} >
                        <CardHeader title={"Consent Toggle"} />
                        <Divider />
                        <CardContent >
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
                                {/* {this.displayComments()} */}
                                <h1>Settings Part 1</h1>
                            </List>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6} >
                        <CardHeader title={"Agree Form"} />
                        <Divider />
                        <CardContent >
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
                                {/* {this.displayComments()} */}
                                <h1>Settings Part 2</h1>
                            </List>
                        </CardContent>
                    </Grid>
                </Grid>
            );
        }


        else {
            return (
                <Grid container spacing={0} className="memberManager mt-3">
                    <Grid item><h1>Error NO Tab Found</h1></Grid>
                </Grid>
            );
        }
    }




    render(): JSX.Element {

        return (
            <div>
                <AppBar position="static">
                    <Typography variant="body1" align="left" color="textPrimary">
                    <Tabs value={this.state.tabValue} onChange={this.changeTab} aria-label="simple tabs example" textColor="inherit">
                        <Tab label="Feed" />
                        <Tab label="Info" />
                        <Tab label="Consent" />
                        {/* <Tab label="Settings" /> */}
                    </Tabs>
                    </Typography>
                </AppBar>



                {this.displayTab()}




            </div>
        );
    }
}

export default MemberUser;
