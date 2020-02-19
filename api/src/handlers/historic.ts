import express from 'express';
import moment from 'moment';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { MongoService } from '../services/mongo';
import { IDbHistoric } from '../types/db';
import { IHistoricResponse } from '../types/response';

export const HistoricHandler = {

  uploadHistoricalData: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.body.userId || '0');
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      ResponseService.bad('Cannot add historic data without a valid user id', res);
      return false;
    }

    const data: IDbHistoric = {
      userId,
      averageTemperature: parseInt(req.body.averageTemperature || '0'),
      membersActive: parseInt(req.body.membersActive || '0'),
      zonesCount: parseInt(req.body.zonesCount || '0'),
      activitiesCount: parseInt(req.body.activitiesCount || '0'),
      locations: JSON.parse(req.body.locations || []),
      createdAt: new Date(),
    };

    MongoService.insertOne('historic' || '', data);
    ResponseService.ok('Added to collection', res);
    return true;
  },

  getHistoricByUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('historic', { userId: parseInt(req.params.userId || '0') });
    if (data === null || data.length <= 0) {
      ResponseService.data([], res);
      return false;
    }

    // Convert to a response friendly format
    const formatted: IHistoricResponse[] = data.map((val: IHistoricResponse) => {
      return {
        userId: val.userId,
        averageTemperature: val.averageTemperature,
        membersActive: val.membersActive,
        zonesCount: val.zonesCount,
        activitiesCount: val.activitiesCount,
        locations: val.locations,
        createdAt: moment(val.createdAt).unix(),
      };
    });

    ResponseService.data(formatted, res);
    return true;

  },

};