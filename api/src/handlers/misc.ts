import express from 'express';
import moment from 'moment';
import { ISimpleResponse } from '../models';
import { MongoService } from '../services/mongo';

export const MiscHandler = {

  getPingResponse: (_req: express.Request, res: express.Response) => {
    const response: ISimpleResponse = { code: 'success', message: 'pong', time: moment().unix() };
    res.send(response);
  },

  getDocumentation: (_req: express.Request, res: express.Response) => {
    res.redirect('https://documenter.getpostman.com/view/8555555/SWT5gzbe?version=latest');
  },

  resetDatabase: async (req: express.Request, res: express.Response) => {
    // Safeguard to ensure this isn't trigerred accidentally
    if (req.params.code !== process.env.PURGE_CODE) {
      const response: ISimpleResponse = { code: 'failed', message: 'invalid purge code', time: moment().unix() };
      res.send(response);
      return false;
    } 

    await MongoService.deleteEverything();
    const response: ISimpleResponse = { code: 'success', message: 'purge complete', time: moment().unix() };
    res.send(response);
    return true;
  }
}