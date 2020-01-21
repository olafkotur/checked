import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { IDbReading, IReadingResponse, ISimpleResponse } from '../models';

export const LiveHandler = {

  uploadLiveData: async (req: express.Request, res: express.Response) => {
    let response: ISimpleResponse | object = {};

    // Safeguard to ensure extra unwanted collections aren't created
    if (!DbHelperService.isValidLiveCollection(req.body.type)) {
      response = { code: "failed", message: 'invalid collection name', time: moment().unix() }
      res.send(response);
      return false;
    }

    const data: IDbReading = {
      sensorId: parseInt(req.body.sensorId),
      value: parseInt(req.body.value),
      createdAt: new Date(),
    };

    // Update only if reading with same sensorId exists
    await DbHelperService.exists(req.body.type, { sensorId: data.sensorId }).then((exists: boolean) => {
      if (exists) {
        MongoService.updateOne(req.body.type, { sensorId: data.sensorId }, data);
      } else {
        MongoService.insertOne(req.body.type, data)
      }
      response = { code: "success", message: 'added to collection', time: moment().unix() }
    });

    res.send(response);
    return true;
  },

  getSingleLiveData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne(req.params.type, { sensorId: parseInt(req.params.sensorId) });
    if (data === null) {
      res.send({});
      return false;
    }

    // Converts to client friendly format
    const formatted: IReadingResponse = {
      sensorId: data.sensorId,
      value: data.value,
      time: moment(data.createdAt).unix(),
    };

    res.send(formatted);
    return true;
  },

  getLiveData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany(req.params.type, {});
    if (data === null) {
      res.send([]);
      return false;
    } 

    // Converts to client friendly format
    const formatted: IReadingResponse[] = data.map((val: any) => {
      return {
        sensorId: val.sensorId,
        value: val.value,
        time: moment(val.createdAt).unix(),
      }
    });

    res.send(formatted);
    return true;
  },
}