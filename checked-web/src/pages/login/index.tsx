import React from 'react';

import { UserService } from '../../api/UserService';
import { Button, Typography, TextField, Grid, Link, Card, CardContent, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Logo from '../../media/checkedLogo.jpg';
interface IState {
    username: string;
    password: string;
    cardCSS: string;
    signUpCardCSS: string;
    signUp: boolean;
    snackbarOpen: boolean;
    snackbarMessage: string;
}

interface IProps {
    setAuthorised(authState: boolean): void;
}

export class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            cardCSS: 'signInCardOnScreen',
            signUpCardCSS: 'signUpCardOffScreen',
            signUp: false,
            snackbarOpen: false,
            snackbarMessage: '',
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.toggleSnackbar = this.toggleSnackbar.bind(this);
    }

    handleSignIn(username: string, password: string): void {
        UserService.login(username, password).then((res) => {
            console.log(res);
            if (res.status === 'ok') {
                this.props.setAuthorised(true);
            } else {
                console.log(res);
                this.setState({ snackbarMessage: res.message });
                this.toggleSnackbar();
            }
        }).catch(() => {
            this.setState({ snackbarMessage: 'Something went wrong.' });
            this.toggleSnackbar();
        });
    }

    handleSignUp(username: string, password: string): void {
        UserService.createUser(username, password).then((res) => {
            if (res.status === 'created') {
                this.props.setAuthorised(true);
            } else {
                this.setState({ snackbarMessage: res.message });
                this.toggleSnackbar();
            }
        }).catch(() => {
            this.setState({ snackbarMessage: 'Something went wrong.' });
            this.toggleSnackbar();
        });;
    }

    handleKeyDown(event: any): void {
        if (event.keyCode === 13) {
            this.handleSignIn(this.state.username, this.state.password);
        }
    }

    handleUsername(event: any): void {
        this.setState({ username: event.target.value });
    };

    handlePassword(event: any): void {
        this.setState({ password: event.target.value });
    };

    toggleSnackbar(): void {
        this.setState({ snackbarOpen: !this.state.snackbarOpen });
    }
                        
    render(): JSX.Element {

        return (
            <div className="tiledBackground vcenterParent overflow-hidden">
                <Card className={'col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-10 offset-1 pr-5 pl-5 vcenterChild signInCard ' + this.state.cardCSS}>
                    <CardContent>
                        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12">
                            <img src={Logo} className="logo mb-4 mt-5" alt="logo" />
                        </div>
                        <div className="text-center w-100">
                            <Typography variant="h6" className="montserrat">
                                Checked
                            </Typography>
                            <Typography variant="subtitle1" className="mb-5 text-muted uppercase">
                                Keep track of your space.
                            </Typography>
                        </div>
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                className="mt-1 mb-3"
                                onChange={this.handleUsername}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                className="mt-3 mb-3"
                                onChange={this.handlePassword}
                                onKeyDown={(e): void => this.handleKeyDown(e)}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="mt-3"
                                onClick={(): void => this.handleSignIn(this.state.username, this.state.password)}
                                disabled={this.state.username.length < 3 || this.state.password.length < 6}
                            >
                                Sign In
                                </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className="mt-3"
                                onClick={(): void => this.handleSignUp(this.state.username, this.state.password)}
                                disabled={this.state.username.length < 3 || this.state.password.length < 6}
                            >
                                Sign Up
                                </Button>
                            <Grid container className="mb-3">
                                <Grid item xs>
                                    {/* <Link href="" variant="body2" color="primary">

                                        </Link> */}
                                </Grid>
                                <Grid item>
                                    <Link href="" variant="body2">
                                        Forgot password?
                                        </Link>
                                </Grid>
                            </Grid>
                        </div>

                    </CardContent>
                </Card>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.toggleSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <MuiAlert onClose={this.toggleSnackbar} variant="filled" severity="error">
                        {this.state.snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        );
    }

}