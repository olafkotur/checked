import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbLocation } from '../types/db';
import { ILocationResponse } from '../types/response';

export const LocationHandler = {

  uploadLocationData: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.body.userId || '0');
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      ResponseService.bad('Cannot add live data without a valid user id', res);
      return false;
    }

    const data: IDbLocation = {
      sensorId: parseInt(req.body.sensorId || '0'),
      userId,
      xValue: parseInt(req.body.xValue || '0'),
      yValue: parseInt(req.body.yValue || '0'),
      createdAt: new Date()
    };

    // Update only if reading with same sensorId exists
    await DbHelperService.exists('location', { sensorId: data.sensorId }).then((exists: boolean) => {
      if (exists) {
        MongoService.updateOne('location', { sensorId: data.sensorId }, data);
      } else {
        MongoService.insertOne('location', data);
      }
    });

    ResponseService.ok('Added to collection', res);
    return true;
  },

  getSingleLocationData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('location', { sensorId: parseInt(req.params.sensorId || '0') });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    } 

    // Converts to client friendly format
    const formatted: ILocationResponse = {
      sensorId: data.sensorId,
      userId: data.userId,
      xValue: data.xValue,
      yValue: data.yValue,
      time: moment(data.createdAt).unix(),
    };

    ResponseService.data(formatted, res);
    return true;
  },

  getLocationData: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('location', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    } 

    // Converts to client friendly format
    const formatted: IDbLocation = data.map((val: any) => {
      return {
        sensorId: val.sensorId,
        userId: val.userId,
        xValue: val.xValue,
        yValue: val.yValue,
        time: moment(val.createdAt).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },
}