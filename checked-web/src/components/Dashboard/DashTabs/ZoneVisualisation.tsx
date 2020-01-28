
import React from 'react';

interface IState {
    zoneData: Array<object>;
}

interface IProps {
    zoneData: Array<object>;
}

class ZoneVisualisation extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { zoneData: this.props.zoneData };
    }

    render(): JSX.Element {

        return (
            <div className="zoneVisContainer h-100 w-100">

            </div>
        );
    }



}

export default ZoneVisualisation;