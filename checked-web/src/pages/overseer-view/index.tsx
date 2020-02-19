import React from 'react';
import UseAnimations from 'react-useanimations';
import { MemberService } from '../../api/MemberService';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import {IMember} from '../../types';
import Overseer from '../../components/Overseer';
import { LinkService } from '../../api/LinkService';


interface IState {
    members: Array<IMember>;
    loaded: boolean;
}

interface IProps extends RouteComponentProps {
    userID: number;
    memberID: number;
}

export class OverseerView extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {members: [], loaded: false};
    }

    componentDidMount(): void {
        LinkService.getMembersByOverseer(this.props.memberID.toString()).then((res) => {
            this.setState({members: res.result, loaded: true });
        });
    }


    render(): JSX.Element {
        return (
            <div className="dashContainer">
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Card className="dashCard">
                            {!this.state.loaded &&
                                <UseAnimations animationKey="loading2" size={100} className="loginLoader vcenterChild" style={{transform: 'rotate(-90deg)'}}/>
                            }   
                            {this.state.loaded && 
                                <Grid container spacing={0} >
                                    <Grid item xs={12}>
                                        <CardHeader title="Overseer View" avatar={<Person className="w-100 h-100" fontSize="large"/>} className="mutedBlack mt-2">
                                        </CardHeader>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CardContent className="pt-1 ml-3 mr-3 pl-0 pr-0 border-top border-muted">
                                            <Overseer userID={this.props.userID} members={this.state.members} />
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            }   
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

