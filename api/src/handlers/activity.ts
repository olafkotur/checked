import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';
import { DbHelperService } from '../services/dbHelper';
import { IDbActivity } from '../types/db';
import { IActivityResponse } from '../types/response';

export const ActivityHandler = {

  createActivity: async (req: express.Request, res: express.Response) => {
    const data: IDbActivity = {
      activityId: await DbHelperService.assignAvailableId('activity', 'activityId'),
      name: req.body.name,
      zoneId: parseInt(req.body.zoneId),
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    // Ensure that the zone exists before continuing
    const zoneExists: boolean = await DbHelperService.exists('zones', { zoneId: data.zoneId });
    if (!zoneExists) {
      ResponseService.bad('Cannot create an activity without a valid zone id', res);
      return false;
    }

    // Ensure that an activity with the same zoneId does not already exist
    await DbHelperService.exists('activity', { zoneId: data.zoneId }).then((exists: boolean) => {
      if (!exists) {
        MongoService.insertOne('activity', data);
        ResponseService.create({ activityId: data.activityId }, res);
      } else {
        ResponseService.bad('Activity in that zone already exists', res);
      }
    });

    return true;
  },

  deleteActivity: async (req: express.Request, res: express.Response) => {
    const activityId: number = parseInt(req.params.activityId);

    // Ensure that the activity exists before attempting to delete
    await DbHelperService.exists('activity', { activityId: activityId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('activity', { activityId: activityId });
        ResponseService.ok('Deleted existing activity', res);
      } else {
        ResponseService.notFound('Activity does not exist', res);
      }
    });
  },

  getActivity: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('activity', { activityId: parseInt(req.params.activityId) });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    // Converts to client friendly format
    const formatted: IActivityResponse = {
      activityId: data.activityId,
      name: data.name,
      zoneId: data.zoneId,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix(),
    };

    ResponseService.data(formatted, res);
    return true;
  },

  getActivities: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('activity', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Converts to client friendly format
    const formatted: IActivityResponse[] = data.map((val: IDbActivity) => {
      return {
        activityId: val.activityId,
        name: val.name,
        zoneId: val.zoneId,
        createdAt: moment(val.createdAt).unix(),
        lastUpdated: moment(val.lastUpdated).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getActivitiesByZone: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('activity', { zoneId: parseInt(req.params.zoneId) });
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Converts to client friendly format
    const formatted: IActivityResponse[] = data.map((val: IDbActivity) => {
      return {
        activityId: val.activityId,
        name: val.name,
        zoneId: val.zoneId,
        createdAt: moment(val.createdAt).unix(),
        lastUpdated: moment(val.lastUpdated).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },
}