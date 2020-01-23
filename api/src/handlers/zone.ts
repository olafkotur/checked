import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbZoneData } from '../types/db';
import { IZoneDataResponse } from '../types/response';

export const ZoneHandler = {

  createZone: async (req: express.Request, res: express.Response) => {
    const data: IDbZoneData = {
      zoneId: await DbHelperService.assignAvailableId('zones', 'zoneId'),
      name: req.body.name,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Ensure that a zone with the same id does not already exist
    await DbHelperService.exists('zones', { zoneId: data.zoneId }).then((exists: boolean) => {
      if (!exists) {
        MongoService.insertOne('zones', data)
        ResponseService.create('Added new zone to collection', res);
      } else {
        ResponseService.bad('Zone already exists', res);
      }
    });
  },

  updateZone: async (req: express.Request, res: express.Response) => {
    const data: IDbZoneData = {
      zoneId: parseInt(req.params.zoneId),
      name: req.body.name,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Ensure that the zone exists before attempting to update
    await DbHelperService.exists('zones', { id: data.zoneId }).then((exists: boolean) => {
      if (exists) {
        MongoService.updateOne('zones', { id: data.zoneId }, data);
        ResponseService.ok('Updated existing zone', res);
      } else {
        ResponseService.notFound('Zone does not exist', res);
      }
    });
  },

  deleteZone: async (req: express.Request, res: express.Response) => {
    const zoneId: number = parseInt(req.params.zoneId);

    // Ensure that the zone exists before attempting to delte
    await DbHelperService.exists('zones', { id: zoneId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('zones', { id: zoneId });
        ResponseService.ok('Deleted existing zone', res);
      } else {
        ResponseService.notFound('Zone does not exist', res);
      }
    });
  },

  getSingleZoneData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('zones', { id: parseInt(req.params.zoneId) });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    // Converts to client friendly format
    const formatted: IZoneDataResponse = {
      id: data.zoneId,
      name: data.name,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix(),
    };

    ResponseService.data(formatted, res);
    return true;
  },
  
  getZoneData: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('zones', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Converts to client friendly format
    const formatted: IZoneDataResponse[] = data.map((val: IDbZoneData) => {
      return {
        id: val.zoneId,
        name: val.name,
        createdAt: moment(val.createdAt).unix(),
        lastUpdated: moment(val.lastUpdated).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  }
}