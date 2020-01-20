import express from 'express';
import moment from 'moment';
import { IZoneDataResponse, IDbZoneData, ISimpleResponse } from '../models';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';

export const ZoneHandler = {

  addZone: async (req: express.Request, res: express.Response) => {
    let response: ISimpleResponse | object = {};

    const data: IDbZoneData = {
      id: parseInt(req.body.id),
      name: req.body.name,
      activity: req.body.activity,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Ensure that a zone with the same id does not already exist
    await DbHelperService.exists('zones', { id: data.id }).then((exists: boolean) => {
      if (!exists) {
        MongoService.insertOne('zones', data)
        response = { code: "success", message: 'added zone to collection', time: moment().unix() }
      } else {
        response = { code: "failed", message: 'zone already exists', time: moment().unix() }
      }
    });

    res.send(response);
  },

  updateZone: async (req: express.Request, res: express.Response) => {
    let response: ISimpleResponse | object = {};

    const data: IDbZoneData = {
      id: parseInt(req.params.zoneId),
      name: req.body.name,
      activity: req.body.activity,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Ensure that the zone exists before attempting to update
    await DbHelperService.exists('zones', { id: data.id }).then((exists: boolean) => {
      if (exists) {
        MongoService.updateOne('zones', { id: data.id }, data);
        response = { code: "success", message: 'updated existing zone', time: moment().unix() }
      } else {
        response = { code: "failed", message: 'zone does not exist', time: moment().unix() }
      }
    });

    res.send(response);
  },

  deleteZone: async (req: express.Request, res: express.Response) => {
    let response: ISimpleResponse | object = {};

    const zoneId: number = parseInt(req.params.zoneId);

    // Ensure that the zone exists before attempting to delte
    await DbHelperService.exists('zones', { id: zoneId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('zones', { id: zoneId });
        response = { code: "success", message: 'deleted existing zone', time: moment().unix() }
      } else {
        response = { code: "failed", message: 'zone does not exist', time: moment().unix() }
      }
    });

    res.send(response);
  },

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