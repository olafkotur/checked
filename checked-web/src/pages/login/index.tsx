import React from 'react';

import { UserService } from '../../api/UserService';
import { Button } from '@material-ui/core';

interface IState {
}

interface IProps {
    setAuthorised(authState: boolean): void;
}

export class Login extends React.Component<IProps, IState> {

    componentDidMount(): void {
        UserService.createUser('mememan3001', 'password').then((res): void => {
            console.log(res);
        }).catch(() => {
            console.log('bad meme');
        });
    }

    render(): JSX.Element {
        return (
            <div>
               <Button onClick={(): void => this.props.setAuthorised(true)}>
                    LOGIN   
                </Button>
            </div>
        );
    }

}