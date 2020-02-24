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
      isCleared: false,
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
      isCleared: data.isCleared || false,
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
        isCleared: val.isCleared || false,
        createdAt: moment(val.createdAt).unix()
      };
    });

    return ResponseService.data(formatted, res);
  },

  getLatestByUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');
    let data: any = await MongoService.findMany('notifications', { userId });
    if (data === null) {
      return ResponseService.data({}, res);
    }

    // Get the latest notification
    data = data.sort((a: IDbNotification, b: IDbNotification) => moment(b.createdAt).unix() - moment(a.createdAt).unix());
    if (data.length <= 0) {
      return ResponseService.data({}, res);
    }
    data = data[0];

    // Convert to response format
    const formatted: INotificationResponse = {
      userId: data.userId,
      notificationId: data.notificationId,
      priority: data.priority,
      value: data.value,
      isCleared: data.isCleared || false,
      createdAt: moment(data.createdAt).unix()
    };

    return ResponseService.data(formatted, res);
  },

  clearNotification: async (req: express.Request, res: express.Response) => {
    const notificationId: number = parseInt(req.params.notificationId || '0');
    const notification: any = await MongoService.findOne('notifications', { notificationId });
    const data: IDbNotification = {
      notificationId: notification.notificationId,
      userId: notification.userId,
      priority: notification.priority,
      value: notification.value,
      isCleared: true,
      createdAt: notification.createdAt
    };

    await MongoService.deleteOne('notifications', { notificationId });
    await MongoService.insertOne('notifications', data);
    return ResponseService.ok('Notification cleared', res);
  },
};
