import express from 'express';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbEvent } from '../types/db';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { IEventResponse } from '../types/response';

export const EventHandler = {
  createEvent: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.body.userId || '0');

    // Ensure that the user exists
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      return ResponseService.bad('Unable to create an event without a valid userId', res);
    }

    // Check that valid information has been passed
    if (!req.body.title || !req.body.description || !req.body.eventDate) {
      return ResponseService.bad('An event must contain a minimum of a title, description and a date', res);
    }

    const data: IDbEvent = {
      userId,
      eventId: await DbHelperService.assignAvailableId('events', 'eventId'),
      title: req.body.title,
      description: req.body.description,
      eventDate: new Date(parseInt(req.body.eventDate)),
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    await MongoService.insertOne('events', data);
    return ResponseService.create(data, res);
  },

  deleteEvent: async (req: express.Request, res: express.Response) => {
    const eventId: number = parseInt(req.params.eventId || '0');
    const exists: boolean = await DbHelperService.exists('events', { eventId });
    if (!exists) {
      return ResponseService.notFound('Cannot delete event that does not exist', res);
    }

    await MongoService.deleteOne('events', { eventId });
    return ResponseService.ok('Event was successfully deleted', res)
  },

  getEvent: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('events', { eventId: parseInt(req.params.eventId || '0')});
    if (data === null) {
      return ResponseService.data({}, res);
    }

    // Convert into a response friendly format
    const formatted: IEventResponse = {
      userId: data.userId,
      eventId: data.eventId,
      title: data.title,
      description: data.description,
      eventDate: moment(data.eventDate).unix(),
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix()
    };

    return ResponseService.data(formatted, res);
  },

  getEventsByUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('events', { userId: parseInt(req.params.userId || '0')});
    if (data === null) {
      return ResponseService.data([], res);
    }

    // Convert into a response friendly format
    const formatted: IEventResponse[] = data.map((event: IDbEvent) => {
      return {
        userId: event.userId,
        eventId: event.eventId,
        title: event.title,
        description: event.description,
        eventDate: moment(event.eventDate).unix(),
        createdAt: moment(event.createdAt).unix(),
        lastUpdated: moment(event.lastUpdated).unix()
      };
    });

    return ResponseService.data(formatted, res);
  },
};
