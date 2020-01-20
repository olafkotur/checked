import express from 'express';
import moment from 'moment';
import { ISimpleResponse, IZoneDataResponse } from '../models';
import { MongoService } from '../services/mongo';

export const MiscHandler = {

  addZone: (_req: express.Request, res: express.Response) => {
    const response: ISimpleResponse = { code: 'success', message: 'pong', time: moment().unix() };
    res.send(response);
  },

  updateZone: () => {},
  deleteZone: () => {},

  getSingleZoneData: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('zones', {});
    if (data === null) {
      res.send({});
      return false;
    }

    // Converts to client friendly format
    const formatted: IZoneDataResponse = {
      id: data.id,
      name: data.name,
      activity: data.activity,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix(),
    };

    res.send(formatted);
    return true;
  }
  
}