
import React from 'react';
import { IZone } from '../../../types';
import { Grid, Typography, Popover, Button, Paper } from '@material-ui/core';
import { Person, Speed } from '@material-ui/icons';
import Zone from './Zone';
interface IState {
    zoneData: Array<IZone>;
    popoverArray: Array<any>;
    anchorArray: Array<(HTMLElement|null)>;
}

interface IProps {
    zoneData: Array<IZone>;
    type: 'temperature' | 'location';
}


class ZoneVisualisation extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        const popoverArray: Array<boolean> = [];
        const anchorArray: Array<(HTMLElement | null)> = [];
        props.zoneData.forEach((zone: IZone, index: number) => {
            popoverArray[index] = false;
            anchorArray[index] = null;
        });

        this.state = { zoneData: this.props.zoneData, popoverArray, anchorArray };
    }

    componentDidMount(): void {

    }

    populateTempZones(): Array<JSX.Element> {
        const tempRenderedZones: Array<JSX.Element> = [];
        this.props.zoneData.forEach((zone, index) => {
            tempRenderedZones.push(
                <Zone zone={zone} type='temperature' key={index}/>
            );
        });
        return tempRenderedZones;
    };

    populateLocationZones(): Array<JSX.Element>  {
        const tempRenderedZones: Array<JSX.Element> = [];
        this.props.zoneData.forEach((zone, index) => {
            tempRenderedZones.push(
                <Zone zone={zone} type='location' key={index} />
            );
        });
        return tempRenderedZones;
    }

    render(): JSX.Element {

        let renderedZones: Array<JSX.Element> = [];

        if(this.props.type === 'temperature'){
            renderedZones = this.populateTempZones();
        } else if (this.props.type === 'location'){
            renderedZones = this.populateLocationZones();
        }
        return (
            <Grid container spacing={0}>
                <Grid item xs={10}>
                    <div className="zoneVisContainer h-100 w-100">
                        {renderedZones}
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