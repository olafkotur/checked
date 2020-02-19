import express from 'express';
import { DbHelperService } from '../services/dbHelper';
import { IDbNotification } from '../types/db';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';
import { INotificationResponse } from '../types/response';
import moment from 'moment';

export const NotificationHandler = {

  createNotification: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.body.userId || '0');
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      return ResponseService.bad('Must provide a valid userId to create a notification', res);
    }

    // Reject priority numbers that are not valid
    const priority: number = parseInt(req.body.priority || '1');
    if (priority <= 0 || priority > 3) {
      return ResponseService.bad('Priority must be a value between 1 and 3', res);
    } 

    // Create notification data
    const notificationId: number = await DbHelperService.assignAvailableId('notifications', 'notificationId');
    const data: IDbNotification = {
      userId,
      notificationId,
      priority,
      value: req.body.value || '',
      createdAt: new Date()
    };

    // Add notification to the database
    await MongoService.insertOne('notifications', data);
    return ResponseService.create({ notificationId }, res);
  },

  getNotification: async (req: express.Request, res: express.Response) => {
    const notificationId: number = parseInt(req.params.notificationId || '0');
    const data: any = await MongoService.findOne('notifications', { notificationId });
    if (data === null) {
      return ResponseService.data({}, res);
    }

    // Convert to response format
    const formatted: INotificationResponse = {
      userId: data.userId,
      notificationId: data.notificationId,
      priority: data.priority,
      value: data.value,
      createdAt: moment(data.createdAt).unix()
    };

    return ResponseService.data(formatted, res);
  },

  getNotificationsByUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');
    const data: any = await MongoService.findMany('notifications', { userId });
    if (data === null) {
      return ResponseService.data([], res);
    }

    // Convert to response format
    const formatted: INotificationResponse[] = data.map((val: INotificationResponse) => {
      return {
        userId: val.userId,
        notificationId: val.notificationId,
        priority: val.priority,
        value: val.value,
        createdAt: moment(val.createdAt).unix()
      };
    });

    return ResponseService.data(formatted, res);
  },

  subscribe: async (req: express.Request, res: express.Response) => {
    
  },
};
