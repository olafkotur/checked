import React from 'react';

import { Typography, IconButton, Divider, Backdrop, Fade, Modal, Card, CardContent, Grid } from '@material-ui/core/';
import { NotificationsNoneOutlined, NotificationsActive, Close } from '@material-ui/icons/';
import { NotificationService } from '../../api/NotificationService';
import _ from 'lodash';

interface IProps {
    userID: number;
}

interface IState {
    notiModal: boolean;
    notification: boolean;
    notifications: Array<any>;
}


class Notifications extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = { notification: false, notiModal: false, notifications: [] };

        this.getNotifications();
    }

    getNotificationIcon(length: number): JSX.Element {
        if (length > 0) {
            return <NotificationsActive className="notiPresentIcon" />;
        };
        return <NotificationsNoneOutlined className="menuIcon" />;
    }

    handleNotiModal = (): void => {
        this.setState({ notiModal: !this.state.notiModal });
    };

    async getNotifications(): Promise<void> {
        const notificationRes = await NotificationService.getNotisByUser(this.props.userID);

        const notis: Array<any> = [];

        _.reverse(notificationRes.result).forEach((notification: any) => {
            if(notification.isCleared === false){
                notis.push(notification);
            }
        });

        this.setState({ notifications: notis });
    }

    async clearNotification(notiId: number): Promise<void> {
        await NotificationService.clearNoti(notiId);
        this.getNotifications();
    }

    renderNotifications(): Array<JSX.Element> {
        const renderedNotis: Array<JSX.Element> = [];

        if(this.state.notifications.length === 0){
            renderedNotis.push(
                <Grid item xs={12} className="h-100 w-100 vcenterParent text-center">
                    <Typography variant="subtitle2">
                        No notifications at present.
                    </Typography>
                </Grid>
            );
        }

        this.state.notifications.forEach((notification) => {
            if(notification.isCleared === false){
                renderedNotis.push(
                    <Grid item xs={12} className="mt-1 mb-1 text-center" key={notification.notificationId}>
                        <Grid container spacing={0} className="pt-2 pb-4 border-bottom ">
                            <Grid item xs={1}>
                                <NotificationsNoneOutlined className="notiListIcon mt-3" />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mt-3">
                                    {notification.value}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className="mt-3">
                                <Typography variant="caption">
                                    {(new Date(notification.createdAt * 1000)).toLocaleString("en-GB")}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={(): void => {this.clearNotification(notification.notificationId);}}>
                                    <Close />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                );
            }
        });

        return renderedNotis;
    }

    render(): JSX.Element {
        const notiModal = this.state.notiModal;

        return (
            <div>
                
            <IconButton onClick={this.handleNotiModal} className="mr-2">
                {this.getNotificationIcon(this.state.notifications.length)}
            </IconButton>
            <Modal
                open={notiModal}
                onClose={this.handleNotiModal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                classes="modal"
            >
                <Fade in={notiModal}>
                    <Card className="modalPaper styledScrollBar">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom align="left">
                                Notifications
                                </Typography>
                            <Divider light />
                            <Grid container spacing={0} className="mt-1">
                                {this.renderNotifications()}
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Modal>

            </div>
        );
    }
}

export default Notifications;