import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Card, CardContent, CardHeader, Divider, Grid, Radio, RadioGroup, createMuiTheme, MuiThemeProvider, IconButton } from "@material-ui/core";
import '../../../index.css';
import { Delete, Save } from "@material-ui/icons";
import color from "@material-ui/core/colors/amber";
import { green } from "@material-ui/core/colors";


interface IState {
    commentVal: string;
    radio: string;
}

interface IProps extends RouteComponentProps {
   new: boolean;
   timeStamp: string;
   textContent: string;
   radioVal: string;
}

const cardStyle = {
    width: "100%",
    marginBottom: 10,
    // height: 300,
    // Just for dev -------
    // position: "absolute",
    // top: 150,
    // left: 150,
    // --------------------
} as React.CSSProperties;




const redLight = createMuiTheme({
    palette: {
        primary: { main: "#f44336" }, 
    },
    overrides: {
        MuiRadio: {
               
                root: {
                    color: "#f44336 !important",
                    '&.$Mui-disabled': {
                        color: "#f44336 !important",
                    }
                },
        }
    },
    
});

const amberLight = createMuiTheme({
    palette: {
        primary: { main: "#ffbf00" },
    },
    overrides: {
        MuiRadio: {
            root: {
                color: "#ffbf00 !important",
                '&.$Mui-disabled': {
                    color: "#ffbf00 !important",
                }
            },
        }
    },

});

const greenLight = createMuiTheme({
    palette: {
        primary: { main: '#11cb5f' },
    },
    overrides: {
        MuiRadio: {
                root: {
                    color: "#11cb5f !important",
                    '&.$Mui-disabled': {
                        color: "#11cb5f !important",
                    }
                },
        }
    },
    
});



export class CommentBox extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {commentVal: this.props.textContent, radio:this.props.radioVal};
    }

    
    


    commentChangeHandler= (event: any): void => {
            this.setState({ commentVal: event.target.value});
        };

    submitHandler = (event: any): void => {
        event.preventDefault(); // Stop the form from reloading the page
        // Submit code below here
        console.log("form submitted");
        console.log(this.state.commentVal);
    };

    radioChange = (event: any): void => {
        this.setState({ radio: event.target.value});
    };


   

   saveOrDel(): JSX.Element{
        if(!this.props.new){
            return(
            <IconButton >
                <Delete />
            </IconButton>
            );
        }
        else{
            return (
                <Grid container>
                    <Grid item>
                        <IconButton >
                            <Save />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton >
                            <Delete />
                        </IconButton>
                    </Grid>
                </Grid>
            );
        }
    };


    // use this for saving
    getTimeStamp(): string{
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes

        return (date + '/' + month + '/' + year + ' ' + hours + ':' + min);

    };


    render(): JSX.Element {
        return (
           <div>
               
               <Card style={cardStyle}>

                    <CardHeader title={this.props.timeStamp} action={

                      this.saveOrDel()
                       
                    } />
                    <Divider />
                    


                    <CardContent >
                        <Grid container style={{ height: "100%" }}>
                            <Grid item xs={11} >
                                <div style={{ width: "100%", height: "100%"}}>
                                    <form style={{height:"100%"}} onSubmit={e => { this.submitHandler(e); }}>
                                        <textarea disabled = {!this.props.new} onChange={this.commentChangeHandler} value={this.state.commentVal} placeholder="Type Here" className="commentBox" />
                                    </form>
                                </div>
                            </Grid>

                            <Grid item xs={1}>
                                <div style={{ height: "100%", paddingLeft:"5px" }}>
                                   
                                        <RadioGroup onChange={this.radioChange} value={this.state.radio} >
                                        <MuiThemeProvider theme={redLight}>
                                            <Radio size="medium" color="primary" value={"1"} disabled={!this.props.new}/>
                                        </MuiThemeProvider>
                                         <MuiThemeProvider theme={amberLight}>
                                            <Radio size="medium" color="primary" disabled={!this.props.new} value={"2"} />
                                        </MuiThemeProvider>
                                        <MuiThemeProvider theme={greenLight}>
                                            <Radio size="medium" color="primary" disabled={!this.props.new} value={"3"} />
                                        </MuiThemeProvider>
                                        </RadioGroup>   
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