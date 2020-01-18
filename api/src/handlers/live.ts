import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { IDbTemperature, ISimpleResponse } from '../models';

export const LiveHandler = {

  uploadLiveData: async (req: express.Request, res: express.Response) => {
    if (!DbHelperService.isValidCollection(req.body.type)) {
      const response: ISimpleResponse = { code: "failed", message: 'invalid collection name', time: moment().unix() }
      res.send(response);
      return false;
    }

    const data: IDbTemperature = {
      sensorId: req.body.sensorId,
      value: req.body.value,
      createdAt: new Date(),
    };

    // Update only if reading with same sensorId exists
    const exists: boolean = await DbHelperService.exists(req.body.type, { sensorId: data.sensorId });
    if (exists) {
      await MongoService.updateOne(req.body.type, { sensorId: data.sensorId }, data);
      console.info('LiveHandler: updated 1 document');
    } else {
      await MongoService.insertOne(req.body.type, data)
      console.info('LiveHandler: added 1 document');
    }

    const response: ISimpleResponse = { code: "success", message: 'added to collection', time: moment().unix() }
    res.send(response);
    return true;
  },  
}