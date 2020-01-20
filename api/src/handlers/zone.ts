import express from 'express';
import moment from 'moment';
import { ISimpleResponse, IZoneDataResponse } from '../models';
import { MongoService } from '../services/mongo';

export const ZoneHandler = {

  addZone: (_req: express.Request, res: express.Response) => {
    const response: ISimpleResponse = { code: 'success', message: 'pong', time: moment().unix() };
    res.send(response);
  },

  updateZone: () => {},
  deleteZone: () => {},

  getSingleZoneData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('zones', { id: parseInt(req.params.zoneId) });
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
  },
  
  getZoneData: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('zones', {});
    if (data === null) {
      res.send([]);
      return false;
    }

    // Converts to client friendly format
    const formatted: IZoneDataResponse[] = data.map((val: any) => {
      return {
        id: val.id,
        name: val.name,
        activity: val.activity,
        createdAt: moment(val.createdAt).unix(),
        lastUpdated: moment(val.lastUpdated).unix(),
      }
    });

    res.send(formatted);
    return true;
  }
}