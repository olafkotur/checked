import React from 'react';

import { UserService } from '../../api/UserService';
import { Button, Typography, TextField, Grid, Link, Card, CardContent, Snackbar, FormControlLabel, Checkbox } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import UseAnimations from 'react-useanimations';

import Logo from '../../media/checkedLogo.jpg';
interface IState {
    email: string;
    password: string;
    snackbarOpen: boolean;
    snackbarMessage: string;
    showLoader: boolean;
    guardian: boolean;
    org: string;
}

interface IProps {
    setAuthorised(authState: boolean): void;
    setUserID(userID: number): void;
    setGuardian(isGuardian: boolean): void;
}

export class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            org: '',
            guardian: false,
            snackbarOpen: false,
            snackbarMessage: '',
            showLoader: false,
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.toggleSnackbar = this.toggleSnackbar.bind(this);
        this.handleOrg = this.handleOrg.bind(this);
        this.handleGuardian = this.handleGuardian.bind(this);
    }

    handleSignIn(email: string, password: string): void {

        this.setState({showLoader: true});
        setTimeout(() => {        
            UserService.login(email, password).then((res) => {
                if (res.status === 'ok') {
                    this.props.setAuthorised(true);
                    this.props.setUserID(res.result.userId);
                    this.props.setGuardian(res.result.isGuardian);
                } else {
                    this.setState({ snackbarMessage: res.message.toString() });
                    this.toggleSnackbar();
                }
            }).catch(() => {
                this.setState({ snackbarMessage: 'Something went wrong.' });
                this.toggleSnackbar();
            });
            this.setState({ showLoader: false });
        }, 1500);
    };

    handleSignUp(email: string, password: string, companyName: string, isGuardian: boolean): void {
        this.setState({ showLoader: true });
        setTimeout(() => {
            UserService.createUser(email, password, companyName, isGuardian).then((res) => {
                if (res.status === 'created') {
                    this.props.setAuthorised(true);
                    this.props.setUserID(res.result.userId);
                    this.props.setGuardian(res.result.isGuardian);
                } else {
                    this.setState({ snackbarMessage: res.message.toString() });
                    this.toggleSnackbar();
                }
            }).catch(() => {
                this.setState({ snackbarMessage: 'Something went wrong.' });
                this.toggleSnackbar();
            });;
            this.setState({ showLoader: false });
        }, 2500);
    }

    handleKeyDown(event: any): void {
        if (event.keyCode === 13) {
            this.handleSignIn(this.state.email, this.state.password);
        }
    }

    handleEmail(event: any): void {
        this.setState({ email: event.target.value });
    };

    handleOrg(event: any): void {
        this.setState({ org: event.target.value });
    };

    handleGuardian(event: any): void {
        this.setState({ guardian: !this.state.guardian });
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
                <Card className="col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-10 offset-1 pr-5 pl-5 vcenterChild signInCard signInCardOnScreen">
                    <CardContent>
                        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12">
                            <img src={Logo} className="logo mb-4 mt-5" alt="logo" />
                        </div>
                        <div className="text-center w-100">
                            <Typography variant="h6" className="montserrat">
                                Checked
                            </Typography>
                            <Typography variant="subtitle1" className="text-muted uppercase">
                                Keep track of your space.
                            </Typography>
                        </div>
                        <div className="loaderDiv text-center mb-2 mt-4 vcenterParent">
                            {this.state.showLoader &&
                                <UseAnimations animationKey="loading2" size={30} className="loginLoader vcenterChild"/>
                            }
                        </div>
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoFocus
                                className="mt-1 mb-3"
                                onChange={this.handleEmail}
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
                                className="mt-1 mb-3"
                                onClick={(): void => this.handleSignIn(this.state.email, this.state.password)}
                                disabled={!this.state.email.includes('@') || this.state.password.length < 6}
                            >
                                Sign In
                            </Button>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="organisation"
                                label="Organisation"
                                name="organisation"
                                autoFocus
                                className="mt-4 mb-3"
                                onChange={this.handleOrg}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.guardian}
                                        onChange={this.handleGuardian}
                                        color="primary"
                                    />
                                }
                                label="Parent/Guardian?"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className="mt-3"
                                onClick={(): void => this.handleSignUp(this.state.email, this.state.password, this.state.org, this.state.guardian)}
                                disabled={!this.state.email.includes('@') || this.state.password.length < 6}
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
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.toggleSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <MuiAlert onClose={this.toggleSnackbar} variant="filled" severity="error">
                        {this.state.snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        );
    }

}