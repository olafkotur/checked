import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { IDbTemperature, ISimpleResponse } from '../models';

export const LiveHandler = {

  uploadLiveData: async (req: express.Request, res: express.Response) => {
    const data: IDbTemperature = {
      sensorId: req.body.sensorId,
      value: req.body.value,
      createdAt: new Date(),
    };

    // Update only if reading with same sensorId exists
    const existingValue = await MongoService.findOne(req.body.type, { sensorId: data.sensorId });
    if (existingValue) {
      await MongoService.updateOne(req.body.type, { sensorId: data.sensorId }, data);
    } else {
      await MongoService.insertOne(req.body.type, data)
    }

    const response: ISimpleResponse = { value: "success", time: moment().unix() }
    res.send(response);
  },  
}