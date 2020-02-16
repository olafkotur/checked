import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Card, CardContent, CardHeader, Divider, Grid, Radio } from "@material-ui/core";
import '../../../index.css';


interface IState {
    commentVal: string;
}

interface IProps extends RouteComponentProps {
    //userID: number;
}

const cardStyle = {

    width: 500,
    // height: 300,
    // Just for dev -------
    position: "absolute",
    top: 150,
    left: 150,
    // --------------------

} as React.CSSProperties;;



export class CommentBox extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {commentVal: ""}
    }

    commentChangeHandler= (event: any): void => {
            console.log("change detected");
            this.setState({ commentVal: event.target.value});
        };

    submitHandler = (event: any): void => {
        event.preventDefault(); // Stop the form from reloading the page
        // Submit code below here
        console.log("form submitted");
        console.log(this.state.commentVal);
    };

    render(): JSX.Element {
        return (
           <div>
               <Card style={cardStyle}>

                    <CardHeader title="Timestamp here"/>
                    <Divider />
                    

                   {/* <CardContent style={{height:"300px"}}> */}
                    <CardContent >
                        <Grid container style={{ height: "100%" }}>

                            <Grid item xs={11} >
                                <div style={{ backgroundColor: "DodgerBlue", width: "100%", height: "100%"}}>
                                    <form style={{height:"100%"}}className="zoneForm" onSubmit={e => { this.submitHandler(e); }}>

                                        <textarea onChange={this.commentChangeHandler} value={this.state.commentVal} placeholder="Comment Here" className="commentBox" />
                                        

                                    </form>

                                </div>
                            </Grid>

                            <Grid item xs={1}>
                                <div style={{ height: "100%", paddingLeft:"5px" }}>
                                    <Radio />
                                    <br/>
                                    <Radio />
                                    <br/>
                                    <Radio />
                                </div>
                               

                            </Grid>
                            
                        
                        
                         </Grid>
                        
                   </CardContent>
                   
               </Card>
               
           </div>
        );
    }
}

export default CommentBox;