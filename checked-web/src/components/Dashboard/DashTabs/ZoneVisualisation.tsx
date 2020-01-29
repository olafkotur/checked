
import React from 'react';
import {IZone} from '../../../types';
import { Grid, Typography } from '@material-ui/core';
import { Person, Speed } from '@material-ui/icons';
interface IState {
    zoneData: Array<IZone>;
    renderedZones: Array<JSX.Element>;
}

interface IProps {
    zoneData: Array<IZone>;
    type: 'temperature' |  'location';
}


class ZoneVisualisation extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = { zoneData: this.props.zoneData, renderedZones: [] };
    }

    componentDidMount(): void {
        switch (this.props.type) {
            case 'temperature':
                this.populateTempZones();
                return;
            case 'location':
                this.populateLocationZones();
                return;
        }
    }

    populateTempZones(): void {
        const tempRenderedZones: Array<JSX.Element> = [];
        this.props.zoneData.forEach((zone) => {
            tempRenderedZones.push(
                <div className="zoneVisZone" style={{ width: zone.width, height: zone.height, top: zone.yValue, left: zone.xValue, backgroundColor: zone.color }}>
                    <Grid container spacing={0} className="h-100 ml-2">
                        <Grid item xs={12}>
                            <Typography variant="h6" className="ml-1 mt-1 fontMontserrat mutedBlack" >
                                {zone.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" className="ml-1 mutedBlack font-italic" >
                                {zone.activity.name || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="h-100 w-100 d-flex flex-row align-items-center">
                                <Speed className="d-flex align-self-center mr-1 ml-1" fontSize="default" />
                                <Typography variant="subtitle1" className="mutedBlack font-bold d-flex align-self-center" >
                                    10°C
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            );
        });
        this.setState({ renderedZones: tempRenderedZones });
    };

    populateLocationZones(): void {
        const tempRenderedZones: Array<JSX.Element> = [];
        this.props.zoneData.forEach((zone) => {
            tempRenderedZones.push(
                <div className="zoneVisZone" style={{width: zone.width, height: zone.height, top: zone.yValue, left: zone.xValue, backgroundColor: zone.color }}>
                    <Grid container spacing={0} className="h-100 ml-2">
                        <Grid item xs={12}>
                            <Typography variant="h6" className="ml-1 mt-1 fontMontserrat mutedBlack" >
                                {zone.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" className="ml-1 mutedBlack font-italic" >
                                {zone.activity.name || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="h-100 w-100 d-flex flex-row align-items-center">
                                <Person className="d-flex align-self-center" fontSize="large"/>
                                <Typography variant="subtitle1" className="mutedBlack font-bold d-flex align-self-center" >
                                    10
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            );
        });
        this.setState({renderedZones: tempRenderedZones});
    }

    render(): JSX.Element {

        return (
            <Grid container spacing={0}>
                <Grid item xs={10}>
                    <div className="zoneVisContainer h-100 w-100">
                        {this.state.renderedZones}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h6" className="ml-1 mt-1 fontMontserrat text-right border-bottom border-muted" >
                        Members
                    </Typography>
                </Grid>

            </Grid>

        );
    }



}

export default ZoneVisualisation;