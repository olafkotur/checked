/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import './CSS/ZoneBlock.css';





interface IState {
    value: string;
    placeHolder: string;

}
interface IProps {
    name: string;
    id: number;
}


class ZoneBlock extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { value: "Zone " + this.props.name , placeHolder: "Zone " + this.props.name };

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    myChangeHandler = (event: any): void => {
        console.log("change detected");
        this.setState({ value: event.target.value });
    };

    mySubmitHandler = (event: any): void => {
        event.preventDefault(); // Stop the form from reloading the page
        // Submit code below here
        console.log("form submitted");
        console.log(this.state.value);
    };

    render() {
        return (
            <div className="zoneBlock" id = {this.state.value} data-dbid = {"Placeholder"} >
                {/* <h1 className="zoneTitle">Zone {this.state.color}</h1> */}

                <form className="zoneForm" onSubmit={e => { this.mySubmitHandler(e); }}>

                    <input id = {this.props.name + "Title"} onChange={this.myChangeHandler} value={this.state.value} className="zoneTitle" type="text" name="zoneName" placeholder={"Zone " + this.props.name} />


                </form>





            </div >
        );
    }

};



export default ZoneBlock;

