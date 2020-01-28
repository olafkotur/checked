/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import './CSS/ZoneBlock.css';





interface IState {
    value: string;
    activity: string;
    backgroundColor: any;
    textColor: any;

}
interface IProps {
    name: string;
    id: number;
    dbid: number;
    pos: any;
    activity: string;
    backgroundColor: any;
    textColor: any;
    setSelectedZone(zone: any): void;
}


class ZoneBlock extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { value: this.props.name, activity: this.props.activity , backgroundColor: this.props.backgroundColor, textColor: this.props.textColor};

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    

    myChangeHandler = (event: any): void => {
        console.log("change detected");
        this.setState({ value: event.target.value});
    };

    activityChangeHandler = (event: any): void => {
        console.log("change detected");
        this.setState({ activity: event.target.value });
    };

    mySubmitHandler = (event: any): void => {
        event.preventDefault(); // Stop the form from reloading the page
        // Submit code below here
        console.log("form submitted");
        console.log(this.state.value);
    };

    setBackground(color: any){
        this.setState({backgroundColor: color.hex});
    }

    setTextColor(color: any){
        this.setState({textColor: color.hex});
    }

    handleClick = (event: any): void => {
        this.props.setSelectedZone(this);
        
    };

    render() {
        return (
            <div className="zoneBlock" onClick={this.handleClick} style={{ backgroundColor: this.state.backgroundColor, width:this.props.pos.width,height:this.props.pos.height,top:this.props.pos.yValue, left:this.props.pos.xValue}} id = {this.state.value} data-dbid = {this.props.dbid} data-activity = {this.state.activity}>
               
                <form className="zoneForm" onSubmit={e => { this.mySubmitHandler(e); }}>

                    <input id = {this.props.name + "Title"} onChange={this.myChangeHandler} value={this.state.value} className="zoneTitle" type="text" name="zoneName" placeholder={this.props.name} style = {{color: this.state.textColor}} />
                    <input className="activityInput" onChange={this.activityChangeHandler} placeholder={'Activity'} value= {this.state.activity} style = {{color: this.state.textColor}}/>

                </form>





            </div >
        );
    }

};



export default ZoneBlock;

