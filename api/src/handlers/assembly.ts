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
    return true;
  },

  updatePoint: async (req: express.Request, res: express.Response) => {
    // Ensure that the zone exists before continuing
    const zoneId: number = parseInt(req.params.zoneId || '0');
    const memberId: number = parseInt(req.body.memberId || '0');
    const assemblyExists: boolean = await DbHelperService.exists('assembly', { zoneId, memberId });
    if (!assemblyExists) {
      ResponseService.bad('There is no existing assembly point for that member in that zone', res);
      return false;
    }

    // Ensure that the member exists before continuing
    const memberExists: boolean = await DbHelperService.exists('members', { memberId });
    if (!memberExists) {
      ResponseService.bad('Cannot update an assembly point without a valid member id', res);
      return false;
    }

    const formatted: IDbAssembly = {
      isActive: req.body.isActive === 'true',
      memberId,
      zoneId,
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    MongoService.updateOne('assembly', { memberId }, formatted);
    ResponseService.ok('Updated existing assembly point', res);
    return true;
  },

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
