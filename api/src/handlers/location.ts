import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { IDbLocation, ILocationResponse, ISimpleResponse } from '../models';

export const LocationHandler = {

  uploadLocationData: async (req: express.Request, res: express.Response) => {
    const data: IDbLocation = {
      sensorId: parseInt(req.body.sensorId),
      xValue: parseInt(req.body.xValue),
      yValue: parseInt(req.body.yValue),
      createdAt: new Date()
    };

    // Update only if reading with same sensorId exists
    const exists: boolean = await DbHelperService.exists('location', { sensorId: data.sensorId });
    if (exists) {
      await MongoService.updateOne('location', { sensorId: data.sensorId }, data);
    } else {
      await MongoService.insertOne('location', data)
    }

    const response: ISimpleResponse = { code: "success", message: 'added to collection', time: moment().unix() }
    res.send(response);
  },

  getSingleLocationData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('location', { sensorId: parseInt(req.params.sensorId) });
    if (data === null) {
      res.send({});
      return false;
    } 

    // Converts to client friendly format
    const formatted: ILocationResponse = {
      sensorId: data.sensorId,
      xValue: data.xValue,
      yValue: data.yValue,
      time: moment(data.createdAt).unix(),
    };

    res.send(formatted);
    return true;
  },

  getLocationData: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('location', {});
    if (data === null) {
      res.send([]);
      return false;
    } 

    // Converts to client friendly format
    const formatted: IDbLocation = data.map((val: any) => {
      return {
        sensorId: val.sensorId,
        xValue: val.xValue,
        yValue: val.yValue,
        time: moment(val.createdAt).unix(),
      }
    });

    res.send(formatted);
    return true;
  },
}