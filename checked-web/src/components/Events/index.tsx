import React from 'react';

import { Typography, IconButton, Divider, Backdrop, Fade, Modal, Card, CardContent, Grid, TextField, Button } from '@material-ui/core/';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Event, CalendarToday, DeleteOutline } from '@material-ui/icons/';
import { EventService } from '../../api/EventService';
import _ from 'lodash';

interface IProps {
    userID: number;
    admin: boolean;
}

interface IState {
    eventModal: boolean;
    eventActive: boolean;
    events: Array<any>;
    newEventTitle: string;
    newEventDescription: string;
    newEventDate: number;
}


class Events extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = { eventActive: false, eventModal: false, events: [], newEventDate: Date.now(), newEventDescription: '', newEventTitle: ''  };

        this.getEvents();

        this.handlEventDate = this.handlEventDate.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleEventName = this.handleEventName.bind(this);
        this.handleEventDescription = this.handleEventDescription.bind(this);
    }

    getEventIcon(length: number): JSX.Element {
        if (length > 0) {
            return <Event className="menuIcon" />;
        };
        return <CalendarToday className="menuIcon" />;
    }

    handleModal = (): void => {
        this.setState({ eventModal: !this.state.eventModal });
    };

    async getEvents(): Promise<void> {
        const eventsRes = await EventService.getEventsByUser(this.props.userID);

        const events: Array<any> = [];

        _.reverse(eventsRes.result).forEach((event: any) => {
            events.push(event);
        });


        this.setState({ events: events });
    }

    renderEvents(): Array<JSX.Element> {
        const renderedEvents: Array<JSX.Element> = [];

        if (this.state.events.length === 0) {
            renderedEvents.push(
                <Grid item xs={12} className="h-100 w-100 vcenterParent text-center pt-5">
                    <Typography variant="subtitle2" className="mt-5">
                        No upcoming events.
                    </Typography>
                </Grid>
            );
        }

        this.state.events.forEach((event) => {
            if (new Date(event.eventDate * 1000) >= new Date()) {
                renderedEvents.push(
                    <Grid item xs={12} className="mt-1 mb-1 ml-2 text-center" key={event.eventId}>
                        <Grid container spacing={0} className="pt-2 pb-4 border-bottom ">
                            
                            <Grid item xs={3}>
                                <Typography variant="subtitle1" className="mt-3" align="left">
                                    {event.title}
                                </Typography>
                                <Typography variant="subtitle2" className="" align="left">
                                    {new Date(event.eventDate * 1000).toLocaleDateString('en-GB')}
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="caption" className="mt-3 w-100" align="left" component="p">
                                    {event.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} className="mt-3">
                                {this.props.admin && <IconButton onClick={(): void => this.handleDelteEvent(event.eventId)}><DeleteOutline></DeleteOutline></IconButton>}
                            </Grid>
                        </Grid>
                    </Grid>

                );
            }
        });

        return renderedEvents.reverse();
    }

    handleEventName(event: any): void {
        this.setState({ newEventTitle: event.target.value });
    };

    handleEventDescription(event: any): void {
        this.setState({ newEventDescription: event.target.value });
    };

    handlEventDate(date: any): void {
        this.setState({ newEventDate: new Date(date).getTime()});
    };

    handleCreateEvent(): void {
        EventService.createEvent(this.props.userID, this.state.newEventTitle, this.state.newEventDescription, this.state.newEventDate).then((res) => {
            this.getEvents();
        }).catch(() => {
            console.log("Error adding event");
        });
    }

    handleDelteEvent(eventId: number): void {
        EventService.deleteEvent(eventId).then((res) => {
            this.getEvents();
        }).catch(() => {
            console.log("Error deleting event");
        });
    }

    render(): JSX.Element {
        const eventsModal = this.state.eventModal;

        if(this.props.admin) {
            return (
                <div>

                    <IconButton onClick={this.handleModal} className="mr-2">
                        {this.getEventIcon(this.state.events.length)}
                    </IconButton>
                    <Modal
                        open={eventsModal}
                        onClose={this.handleModal}
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                        classes="modal"
                    >
                        <Fade in={eventsModal}>
                            <Card className="modalPaper overflow-hidden">
                                <CardContent className="h-100" >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Typography gutterBottom align="left" className="w-100 border-bottom pb-2">
                                            Events
                                        </Typography>
                                        <Grid container spacing={0} className="h-100">
                                            <Grid item xs={8} className="h-100" >
                                                <Grid container spacing={0} className="h-100 border-right my-3 pr-2 eventsCard styledScrollBar">
                                                    {this.renderEvents()}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4} >
                                                <Grid container spacing={0} className="mt-4 p-5">
                                                    <Grid item xs={12}className="text-center">
                                                        <Typography gutterBottom align="center">
                                                            Add Event
                                                        </Typography>
                                                        <Divider light className="ml-5 mr-5 mt-1"/>
                                                    </Grid>
                                                    <Grid item xs={12} className="mt-3">
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            id="eventTitle"
                                                            label="Event Name"
                                                            name="eventTitle"
                                                            onChange={this.handleEventName}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            id="eventDescription"
                                                            label="Event Description"
                                                            name="eventDescription"
                                                            multiline
                                                            rows="4"
                                                            onChange={this.handleEventDescription}
                                                            className="styledScrollBar"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                fullWidth
                                                                format="dd/MM/yyyy"
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                label="Event Date"
                                                                value={this.state.newEventDate}
                                                                onChange={this.handlEventDate}
                                                            />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            type="button"
                                                            fullWidth
                                                            variant="contained"
                                                            color="primary"
                                                            className="mt-3"
                                                            onClick={this.handleCreateEvent}
                                                        >
                                                            Add Event
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Modal>

                </div>
            );
        } else {
            return (
                <div>

                    <IconButton onClick={this.handleModal} className="mr-2">
                        {this.getEventIcon(this.state.events.length)}
                    </IconButton>
                    <Modal
                        open={eventsModal}
                        onClose={this.handleModal}
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                        classes="modal"
                    >
                        <Fade in={eventsModal}>
                            <Card className="modalPaper styledScrollBar">
                                <CardContent>
                                    <Typography gutterBottom align="left">
                                        Events
                                    </Typography>
                                    <Divider light />
                                    <Grid container spacing={0} className="mt-1">
                                        {this.renderEvents()}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Modal>

                </div>
            );
        }
    }
}

export default Events;