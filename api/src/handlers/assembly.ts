import express from 'express';
import { IDbAssembly } from '../types/db';
import { IAssemblyResponse } from '../types/response';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';
import moment from 'moment';
import { DbHelperService } from '../services/dbHelper';


export const AssemblyHandler = {

  createPoint: async (req: express.Request, res: express.Response) => {
    const data: IDbAssembly = {
      isActive: true,
      memberId: parseInt(req.body.memberId || '0'),
      zoneId: parseInt(req.body.zoneId || '0'),
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    // Ensure that the zone exists before continuing
    const zoneExists: boolean = await DbHelperService.exists('zones', { zoneId: data.zoneId });
    if (!zoneExists) {
      ResponseService.bad('Cannot create an assembly point without a valid zone id', res);
      return false;
    }

    // Ensure that the member exists before continuing
    const memberExists: boolean = await DbHelperService.exists('members', { memberId: data.memberId });
    if (!memberExists) {
      ResponseService.bad('Cannot create an assembly point without a valid member id', res);
      return false;
    }

    // Attempt to update an assembly point, otherwise create a new one
    const exists: boolean = await DbHelperService.exists('assembly', { memberId: data.memberId });
    if (exists) {
      MongoService.updateOne('assembly', { memberId: data.memberId }, data);
      ResponseService.ok('Updated existing assembly point', res);
    } else {
      MongoService.insertOne('assembly', data);
      ResponseService.ok('Added new assembly point', res);
    }

  },

  updatePoint: async (req: express.Request, res: express.Response) => {},

  getPoints: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('assembly', { zoneId: parseInt(req.params.zoneId || '0') });
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Converts to client friendly format
    const formatted: IAssemblyResponse[] = data.map((val: IDbAssembly) => {
      return {
        isActive: val.isActive,
        memberId: val.memberId,
        zoneId: val.zoneId,
        createdAt: moment(val.createdAt).unix(),
        lastUpdated: moment(val.lastUpdated).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },

};

// const data: IDbActivity = {
//   activityId: await DbHelperService.assignAvailableId('activity', 'activityId'),
//   name: req.body.name || '',
//   zoneId: parseInt(req.body.zoneId || '0'),
//   createdAt: new Date(),
//   lastUpdated: new Date()
// };

// // Ensure that the zone exists before continuing
// const zoneExists: boolean = await DbHelperService.exists('zones', { zoneId: data.zoneId });
// if (!zoneExists) {
//   ResponseService.bad('Cannot create an activity without a valid zone id', res);
//   return false;
// }

// // Ensure that an activity with the same zoneId does not already exist
// await DbHelperService.exists('activity', { zoneId: data.zoneId }).then((exists: boolean) => {
//   if (!exists) {
//     MongoService.insertOne('activity', data);
//     ResponseService.create({ activityId: data.activityId }, res);
//   } else {
//     ResponseService.bad('Activity in that zone already exists', res);
//   }
// });

// return true;