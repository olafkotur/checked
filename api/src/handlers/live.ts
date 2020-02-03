import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbLive } from '../types/db';
import { ILiveResponse } from '../types/response';

export const LiveHandler = {

  uploadLiveData: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.body.userId || '0');
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      ResponseService.bad('Cannot add live data without a valid user id', res);
      return false;
    }

    // Fetch location data to figure out the zone
    const memberId: number = parseInt(req.body.memberId || '0');
    const location: any = await MongoService.findOne('location', { memberId });
    
    const data: IDbLive = {
      dataType: req.body.type,
      memberId,
      userId,
      zoneId: location.zoneId,
      value: parseInt(req.body.value),
      createdAt: new Date(),
    };

    // Update only if reading with same member and data type exists
    await DbHelperService.exists('live', { memberId: data.memberId, dataType: data.dataType }).then((exists: boolean) => {
      if (exists) {
        MongoService.updateOne('live', { memberId: data.memberId, dataType: data.dataType }, data);
      } else {
        MongoService.insertOne('live', data)
      }
    });

    ResponseService.ok('Added to collection', res);
    return true;
  },

  getLiveDataByMember: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('live', { memberId: parseInt(req.params.memberId || '0'), dataType: req.params.type });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    // Converts to client friendly format
    const formatted: ILiveResponse = {
      dataType: data.dataType,
      memberId: data.memberId,
      userId: data.userId,
      zoneId: data.zoneId,
      value: data.value,
      time: moment(data.createdAt).unix(),
    };

    ResponseService.data(formatted, res);
    return true;
  },

  getLiveData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('live', { dataType: req.params.type });
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Converts to client friendly format
    const formatted: ILiveResponse[] = data.map((val: any) => {
      return {
        dataType: val.dataType,
        memberId: val.memberId,
        userId: val.userId,
        zoneId: val.zoneId,
        value: val.value,
        time: moment(val.createdAt).unix(),
      };
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getLiveDataByZone: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('live', { zoneId: parseInt(req.params.zoneId || '0'), dataType: req.params.type });
    if (data === null || data.length <= 0) {
      ResponseService.data({}, res);
      return false;
    }

    // Calculate an average of all the temperature readings
    let valueSum: number = 0;
    data.forEach((val: any) => valueSum += val.value);

    // Converts to client friendly format
    const formatted: ILiveResponse = {
      dataType: data[0].dataType,
      userId: data[0].userId,
      zoneId: data[0].zoneId,
      value: Math.round(valueSum / data.length),
      time: moment(data[0].createdAt).unix(),
    }

    ResponseService.data(formatted, res);
    return true;
  },
}