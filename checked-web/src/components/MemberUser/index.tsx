import React from 'react';
import { Grid, List, Button, TextField, CardContent, CardHeader, Divider, AppBar, Tab, Tabs, Radio, RadioGroup, FormControlLabel, Avatar, Typography } from "@material-ui/core";
import { IMember } from '../../types';
import CommentBox from '../MemberManager/comments/commentBox';
import { CommentService } from '../../api/CommentService';
import UseAnimations from 'react-useanimations';
import { ConsentService } from '../../api/ConsentService';
import { Person } from '@material-ui/icons';
import LightGraph from '../Overseer/LightGraph/LightGraph';
import { MemberService } from '../../api/MemberService';





interface IState {
    currentMember: number;
    firstName: string;
    lastName: string;
    overseers: Array<object>;
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
            overseers: [
                { name: 'Parent McParentson', email: 'this@memes.com' },
                { name: 'Parent McParentson2', email: 'this2@memes.com' },
                { name: 'Parent McParentson3', email: 'this3@memes.com' },
            ],
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
        };

        this.deleteComment = this.deleteComment.bind(this);
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
        // console.log(this.props.memberID);
        this.getFeedList();
        this.getConsent();
        this.getMemberInfo();
        this.getAccepted();

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


        // console.log(CommentService.getComments(this.props.memberID.toString()));



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
            return ([<div style={{ height: "500px" }}><UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} /></div>]);
        }

    }

    async deleteComment(commentBox: any): Promise<void> {
        // console.log("i have been called");

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
            };

            tempComments.push(newComment);

            // console.log(tempComments);

            this.setState({ comments: tempComments, editingComment: true });
        }
        else {
            alert("you can only add one comment at a time");
        }
    }

    async saveComment(commentBox: any): Promise<void> {
        // console.log("Saving Now");


        const body = {
            memberId: this.state.currentMember,
            rating: parseInt(commentBox.state.radio),
            value: commentBox.state.commentVal,
        };

        // console.log(body);

        await CommentService.saveComment(body);


        this.setState({ comments: [] });
        await this.getFeedList();

        const tempComments: any = [];

        this.state.comments.forEach(async commentBoxTmp => {
            if (commentBoxTmp.commentId !== commentBox.props.dbid) {
                tempComments[tempComments.length] = commentBoxTmp;
            }
        });

        this.setState({ comments: tempComments, editingComment: false });

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


        if (this.state.consentType === "Terms") {
            return (this.state.termsForm);
        }
        else if (this.state.consentType === "Privacy") {
            return (this.state.privacyForm);
        }
        else if (this.state.consentType === "Consent") {
            return (this.state.consentForm);
        }
        else {
            return ("ERROR");
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
                        <TextField id="outlined-basic" value={this.decideConsent()} label={this.state.consentType} variant="outlined" style={{ width: "100%" }} disabled />

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
            return (<div style={{ height: "500px" }}><UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{ transform: 'rotate(-90deg)' }} /></div>);
        }
    };

    handleConsentToggle = (event: any): void => {
        this.setState({ consentType: event.target.value });
        // console.log(event.target.value);

    };

    handleAcceptConsent(event: any): void {
        // console.log("Accept");
        // console.log(this.state.consentType);
        ConsentService.updateConsent(true, this.props.memberID, this.state.consentType);
        this.getAccepted();
    };

    handleDeclineConsent(event: any): void {
        // console.log("Decline");
        // console.log(this.state.consentType);
        ConsentService.updateConsent(false, this.props.memberID, this.state.consentType);
        this.getAccepted();
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
                        <CardHeader title={"OverSeer Feedback"} />
                        <Divider />
                        <CardContent >
                            <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
                                {/* {this.displayComments()} */}
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
                                            <Typography style={{marginTop:10}}>
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
    determineAccepted(value: string): JSX.Element {
        
        if(!this.state.loadingAccepted){
            if (value === "Consent") {
                if (this.state.consentAccepted){
                    return (<div> Accepted </div>);
                }
                else{
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
        else{
            return (<div> Loading </div>);
        }


        // return(<div> Accepted </div>);
    }
    async getAccepted(): Promise <void>{
        this.setState({ loadingAccepted: true });
        const Consent = await ConsentService.getConsentMember(this.props.memberID);
        // const TandC = await ConsentService.getConditionsMember(this.props.memberID);
        // const Privacy = await ConsentService.getPrivacyMember(this.props.memberID);
        // console.log(Consent);
        // console.log("-----------------------------");
        // console.log(TandC);
        // console.log("-----------------------------");
        // console.log(Privacy);
        this.setState({
            consentAccepted: Consent,
            // termsAccepted: TandC,
            // privacyAccepted: Privacy,
            loadingAccepted: false,
        });
    }



    render(): JSX.Element {

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.tabValue} onChange={this.changeTab} aria-label="simple tabs example">
                        <Tab label="Feed" />
                        <Tab label="Info" />
                        <Tab label="Consent" />
                        <Tab label="Settings" />
                    </Tabs>
                </AppBar>



                {this.displayTab()}




            </div>
        );
    }
}

export default MemberUser;
