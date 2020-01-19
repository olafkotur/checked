import express from 'express';
import moment from 'moment';
import { ISimpleResponse } from '../models';
import { MongoService } from '../services/mongo';

export const MiscHandler = {

  getPingResponse: (_req: express.Request, res: express.Response) => {
    const response: ISimpleResponse = { code: 'success', message: 'PONG', time: moment().unix() };
    res.send(response);
  },

  getDocumentation: (_req: express.Request, res: express.Response) => {
    res.redirect('https://documenter.getpostman.com/view/8555555/SWT5gzbe?version=latest');
  },

  resetDatabase: async (_req: express.Request, res: express.Response) => {
    await MongoService.deleteEverything();

    const response: ISimpleResponse = { code: 'success', message: 'Purge complete', time: moment().unix() };
    res.send(response);
  }
}