import React from 'react';

interface Props {
  // your props validation
}

interface State {
  // state types
}

class ZoneForm extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            age: null,
        };
    }
    myChangeHandler = (event: any) => {
        const nam = event.target.name;
        const val = event.target.value;
        this.setState({ [nam]: val });
        console.log("statechange");
    };
    render() {
        return (
            <form>
                
                <p>Enter your name:</p>
                <input
                    type='text'
                    name='username'
                    onChange={this.myChangeHandler}
                />
                <p>Enter your age:</p>
                <input
                    type='text'
                    name='age'
                    onChange={this.myChangeHandler}
                />
            </form>
        );
    }
}

export default ZoneForm;