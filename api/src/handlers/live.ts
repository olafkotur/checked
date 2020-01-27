import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbLive } from '../types/db';
import { ILiveResponse } from '../types/response';

export const LiveHandler = {

  uploadLiveData: async (req: express.Request, res: express.Response) => {
    // Safeguard to ensure extra unwanted collections aren't created
    if (!DbHelperService.isValidLiveCollection(req.body.type || '')) {
      ResponseService.bad('Invalid collection name', res);
      return false;
    }

    const userId: number = parseInt(req.body.userId || '0');
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      ResponseService.bad('Cannot add live data without a valid user id', res);
      return false;
    }

    const data: IDbLive = {
      sensorId: parseInt(req.body.sensorId || '0'),
      userId,
      value: parseInt(req.body.value),
      createdAt: new Date(),
    };

    // Update only if reading with same sensorId exists
    await DbHelperService.exists(req.body.type || '', { sensorId: data.sensorId }).then((exists: boolean) => {
      if (exists) {
        MongoService.updateOne(req.body.type || '', { sensorId: data.sensorId }, data);
      } else {
        MongoService.insertOne(req.body.type || '', data)
      }
    });

    ResponseService.ok('Added to collection', res);
    return true;
  },

  getSingleLiveData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne(req.params.type || '', { sensorId: parseInt(req.params.sensorId || '0') });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    // Converts to client friendly format
    const formatted: ILiveResponse = {
      sensorId: data.sensorId,
      userId: data.userId,
      value: data.value,
      time: moment(data.createdAt).unix(),
    };

    ResponseService.data(formatted, res);
    return true;
  },

  getLiveData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany(req.params.type || '', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    } 

    // Converts to client friendly format
    const formatted: ILiveResponse[] = data.map((val: any) => {
      return {
        sensorId: val.sensorId,
        userId: val.userId,
        value: val.value,
        time: moment(val.createdAt).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },
}