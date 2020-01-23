import express from 'express';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';
import { DbHelperService } from '../services/dbHelper';
import { IDbActivity } from '../types/db';

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
        MongoService.insertOne('activity', data)
        ResponseService.create('Added new activity to collection', res);
      } else {
        ResponseService.bad('Activity in that zone already exists', res);
      }
    });

    return true;
  },

  // updateActivity: (req: express.Request, res: express.Response) => {},

  // deleteActivity: (req: express.Request, res: express.Response) => {},

  // getActivity: (req: express.Request, res: express.Response) => {},

  // getActivities: (req: express.Request, res: express.Response) => {},
}