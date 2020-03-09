import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Card, CardContent, CardHeader, Divider, Grid, Radio, RadioGroup, createMuiTheme, MuiThemeProvider, IconButton} from "@material-ui/core";
import '../../../index.css';
import { Delete, Save,  AddAPhoto } from "@material-ui/icons";
import { DropzoneArea } from '../../../../node_modules/material-ui-dropzone';




interface IState {
    commentVal: string;
    radio: string;
    hasImage: boolean;
    imageDropped: boolean;
    image: any;
}

interface IProps extends RouteComponentProps {
    new: boolean;
    timeStamp: string;
    textContent: string;
    radioVal: string;
    dbid: number;
    deleteThisComment(commentBox: any): void;
    saveThisComment(commentBox: any): void;
    canDelete: boolean;
    imageSrc: string;
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
        this.state = { commentVal: this.props.textContent, radio: this.props.radioVal, hasImage: false, imageDropped: false, image: this.props.imageSrc };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleDropImage = this.handleDropImage.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }



    handleDelete(event: any): void {
        console.log("delete me");
        this.props.deleteThisComment(this);
    }

    handleSave(event: any): void {
        this.props.saveThisComment(this);
    }

    handleAddImage(event: any): void {
        if (!this.state.hasImage) {
            this.setState({ hasImage: true });
        }
        else {
            this.setState({ hasImage: false, imageDropped: false, image: null });
        }
    }

    handleDropImage(files: any): void {
        console.log(files);
        this.getBase64(files[0]);
    }

    getBase64(file: any): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (): void => this.setState({ imageDropped: true, image: reader.result });
           
        reader.onerror = function (error): void {
            console.log('Error: ', error);
        };
    }


    commentChangeHandler = (event: any): void => {
        this.setState({ commentVal: event.target.value });
    };

    submitHandler = (event: any): void => {
        event.preventDefault(); // Stop the form from reloading the page
        // Submit code below here
        console.log("form submitted");
        console.log(this.state.commentVal);
    };

    radioChange = (event: any): void => {
        this.setState({ radio: event.target.value });
    };




    saveOrDel(): JSX.Element {
        if (!this.props.new) {
            if (this.props.canDelete) {
                return (
                    <IconButton >
                        <Delete onClick={this.handleDelete} />
                    </IconButton>
                );
            }
            else {
                return (
                    <div></div>
                );
            }

        }
        else {
            return (
                <Grid container>
                    <Grid item>
                        <IconButton >
                            <AddAPhoto onClick={this.handleAddImage} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton >
                            <Save onClick={this.handleSave} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton >
                            <Delete onClick={this.handleDelete} />
                        </IconButton>
                    </Grid>
                </Grid>
            );
        }
    };


    trafficLight(): JSX.Element {

        if (this.props.radioVal === "0" && this.props.new === false) {
            return (
                <Grid container style={{ height: "100%" }}>
                    <Grid item xs={12} >
                        <div style={{ width: "100%", height: "100%" }}>
                            <form style={{ height: "100%" }} onSubmit={this.submitHandler}>
                                <textarea disabled={!this.props.new} onChange={this.commentChangeHandler} value={this.state.commentVal} placeholder="Type Here" className="commentBox" />
                            </form>
                        </div>
                    </Grid>


                </Grid>
            );
        }
        else {
            return (
                <Grid container style={{ height: "100%" }}>
                    <Grid item xs={11} >
                        <div style={{ width: "100%", height: "100%" }}>
                            <form style={{ height: "100%" }} onSubmit={this.submitHandler}>
                                <textarea disabled={!this.props.new} onChange={this.commentChangeHandler} value={this.state.commentVal} placeholder="Type Here" className="commentBox" />
                            </form>
                        </div>
                    </Grid>

                    <Grid item xs={1}>
                        <div style={{ height: "100%", paddingLeft: "7px" }} className="radioBox">
                            <RadioGroup onChange={this.radioChange} value={this.state.radio} >
                                <MuiThemeProvider theme={redLight}>
                                    <Radio size="medium" color="primary" value={"1"} disabled={!this.props.new} />
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
            );
        }


    }

    

    getImage(): JSX.Element {

       
       

        console.log(this.state.image);

        if (this.state.image != null && this.props.new === false) {
            return (
                <div>
                    <Divider />

                    <img
                        // className={classes.media}
                        // src={`data:image/jpeg;base64,${this.state.image}`}
                        src={this.state.image}
                        style={{ width: "100%", paddingTop: 10 }}
                        alt="comment"
                    />
                </div>
            );
        }

        else if (this.props.new && this.state.hasImage) {
            if(!this.state.imageDropped){
                return (
                    <div style= {{paddingTop:10}}>
                        <Divider />
                        <DropzoneArea
                            onChange={this.handleDropImage}
                            filesLimit = {1}
                            acceptedFiles = {['image/*']}
                    />
                    </div>
                );
            }
            else{
                return (
                    <div style={{ paddingTop: 10 }}>
                        <Divider />
                        <img 
                            src = {this.state.image} 
                            style={{ width: "100%", paddingTop: 10 }}
                            alt="comment"
                        />
                        
                    </div>
                );
            }
        }

        else {
            return (
                <div></div>
            );
        }

    }

    render(): JSX.Element {
        return (
            <div>

                <Card style={cardStyle}>

                    <CardHeader title={this.props.timeStamp} action={

                        this.saveOrDel()

                    } />
                    <Divider />



                    <CardContent >
                        {this.trafficLight()}

                        {this.getImage()}

                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default CommentBox;