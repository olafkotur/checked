import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbZone } from '../types/db';
import { IZoneResponse } from '../types/response';

export const ZoneHandler = {

  createZone: async (req: express.Request, res: express.Response) => {
    const data: IDbZone = {
      zoneId: await DbHelperService.assignAvailableId('zones', 'zoneId'),
      name: req.body.name || '',
      width: parseInt(req.body.width || '100'),
      height: parseInt(req.body.height || '100'),
      xValue: parseInt(req.body.xValue || '0'),
      yValue: parseInt(req.body.yValue || '0'),
      color: req.body.color || 'rgb(255, 158, 0)',
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Ensure that a zone with the same id does not already exist
    await DbHelperService.exists('zones', { zoneId: data.zoneId }).then((exists: boolean) => {
      if (!exists) {
        MongoService.insertOne('zones', data)
        ResponseService.create({ zoneId: data.zoneId }, res);
      } else {
        ResponseService.bad('Zone already exists', res);
      }
    });
  },

  updateZone: async (req: express.Request, res: express.Response) => {
    const data: IDbZone = {
      zoneId: parseInt(req.params.zoneId),
      name: req.body.name || '',
      width: parseInt(req.body.width || '100'),
      height: parseInt(req.body.height || '100'),
      xValue: parseInt(req.body.xValue || '0'),
      yValue: parseInt(req.body.yValue || '0'),
      color: req.body.color || 'rgb(255, 158, 0)',
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Ensure that the zone exists before attempting to update
    await DbHelperService.exists('zones', { zoneId: data.zoneId }).then((exists: boolean) => {
      if (exists) {
        MongoService.updateOne('zones', { zoneId: data.zoneId }, data);
        ResponseService.ok('Updated existing zone', res);
      } else {
        ResponseService.notFound('Zone does not exist', res);
      }
    });
  },

  deleteZone: async (req: express.Request, res: express.Response) => {
    const zoneId: number = parseInt(req.params.zoneId || '0');

    // Ensure that the zone exists before attempting to delte
    await DbHelperService.exists('zones', { zoneId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('zones', { zoneId });
        ResponseService.ok('Deleted existing zone', res);
      } else {
        ResponseService.notFound('Zone does not exist', res);
      }
    });
  },

  getSingleZoneData: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('zones', { zoneId: parseInt(req.params.zoneId || '0') });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    // Converts to client friendly format
    const formatted: IZoneResponse = {
      zoneId: data.zoneId,
      name: data.name,
      width: data.width,
      height: data.height,
      xValue: data.xValue,
      yValue: data.yValue,
      color: data.color,
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
    const formatted: IZoneResponse[] = data.map((val: IDbZone) => {
      return {
        zoneId: val.zoneId,
        name: val.name,
        width: val.width,
        height: val.height,
        xValue: val.xValue,
        yValue: val.yValue,
        color: val.color,
        createdAt: moment(val.createdAt).unix(),
        lastUpdated: moment(val.lastUpdated).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  }
}