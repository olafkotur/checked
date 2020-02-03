import express from 'express';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { IDbHistoric } from '../types/db';
import { MongoService } from '../services/mongo';

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
      createdAt: new Date(),
    };

    MongoService.insertOne('historic' || '', data);
    ResponseService.ok('Added to collection', res);
    return true;
  },

};