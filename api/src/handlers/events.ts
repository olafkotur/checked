import express from 'express';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbEvent } from '../types/db';
import moment from 'moment';
import { MongoService } from '../services/mongo';

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
    }

    await MongoService.insertOne('events', data);
    return ResponseService.create(data, res);
  },

  delteEvent: (req: express.Request, res: express.Response) => {},
  getEvent: (req: express.Request, res: express.Response) => {},
  getEventsByUser: (req: express.Request, res: express.Response) => {},
};
