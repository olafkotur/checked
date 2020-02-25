import React from 'react';
import { Grid, List, ListItem, ListItemAvatar, Typography, Card, IconButton, Button, Avatar, TextField, CardContent, CardHeader, Divider, AppBar, Tab, Tabs } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IMember } from '../../types';
import { Person, ArrowForwardIos, Add, PersonAdd } from '@material-ui/icons';
import { MemberService } from '../../api/MemberService';
import CommentBox from '../MemberManager/comments/commentBox';
import { CommentService } from '../../api/CommentService';
import UseAnimations from 'react-useanimations';




interface IState {
    currentMember: number;
    firstName: string;
    lastName: string;
    overseers: Array<object>;
    comments: Array<any>;
    editingComment: boolean;
    loadingComments: boolean;
    chaningMember: boolean;
}
interface IProps {
    members: Array<IMember>;
    userID: number;
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
            chaningMember: false,
        };

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.addComment = this.addComment.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.displayComments = this.displayComments.bind(this);
    }


  

    handleFirstName(event: any): void {
        this.setState({ firstName: event.target.value });
    };

    handleLastName(event: any): void {
        this.setState({ lastName: event.target.value });
    };

    

   

    


    


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

    async getFeedList(memberID: number): Promise<void> {
        this.setState({ loadingComments: true });
        const serverInfo = await CommentService.getComments(memberID.toString());
        // console.log(serverInfo);

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
                // console.log(comment);

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
                    canDelete = {false}
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
        await this.getFeedList(this.state.currentMember);

        const tempComments: any = [];

        this.state.comments.forEach(async commentBoxTmp => {
            if (commentBoxTmp.commentId !== commentBox.props.dbid) {
                tempComments[tempComments.length] = commentBoxTmp;
            }
        });

        this.setState({ comments: tempComments, editingComment: false });




    }


    render(): JSX.Element {

        return (
            // <Grid container spacing={0} className="memberManager mt-3">
            //     <Grid item xs={12} className="p-2 pl-4">
                    
            //     <div className="w-100 h-100">
            //             <Grid container spacing={2} className="p-4 h-100">
            //                 <Grid item xs={4} className="text-center border-right pr-5">
            //                     <Grid container spacing={1}>
            //                         <Grid item xs={12} className="mt-3 mb-3">
            //                             <Avatar className="memberAvatar">
            //                                 <Person fontSize="large" className="w-100 h-100 m-1" />
            //                             </Avatar>
            //                         </Grid>
            //                         <Grid item xs={12}>
            //                             <Typography variant="subtitle2">
            //                                 Member ID: {this.state.currentMember}
            //                             </Typography>
            //                             <Typography variant="subtitle1">
            //                                 {this.state.firstName + " " + this.state.lastName}
            //                             </Typography>
            //                         </Grid>
            //                         <Grid item xs={12}>



            //                         </Grid>


            //                         {/* TODO: Pull parents, allow multiple select, add list of already selected parents */}



            //                     </Grid>
            //                     {/* {this.createChart()} */}
            //                 </Grid>
            //                 <Grid item xs={4} >
            //                     {/* Comment feed here */}
            //                     {/* <div style={{width:"100%", height:"calc(100% - 500px)", backgroundColor:"red"}}> */}


            //                     <CardHeader title={"Comment Feed"} />
            //                     <Divider />
            //                     <CardContent >
            //                         <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
            //                             {this.displayComments()}
            //                         </List>
            //                     </CardContent>

            //                     {/* </div> */}


            //                 </Grid>

            //                 <Grid item xs={4} >
            //                     {/* Comment feed here */}
            //                     {/* <div style={{width:"100%", height:"calc(100% - 500px)", backgroundColor:"red"}}> */}


            //                     <CardHeader title={"Comment Feed"} />
            //                     <Divider />
            //                     <CardContent >
            //                         <List className="pr-3 pl-2 commentList" style={{ width: "100%" }}>
            //                             {this.displayComments()}
            //                         </List>
            //                     </CardContent>

            //                     {/* </div> */}


            //                 </Grid>
            //             </Grid>
            //         </div>
            
            //     </Grid>
            // </Grid>

            <div>
                <AppBar position="static">
                    <Tabs value={"hello"}  aria-label="simple tabs example">
                    {/* <Tabs  aria-label="simple tabs example"> */}
                        <Tab label="Feed"  />
                        <Tab label="Consent"  />
                        <Tab label="Settings"  />
                    </Tabs>
                </AppBar>
                {/* <TabPanel value={value} index={0}>
                    Item One
                 </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel> */}

            </div>
        );
    }
}

export default MemberUser;
