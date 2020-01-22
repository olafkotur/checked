import express from 'express';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';

export const MiscHandler = {

  getPingResponse: (_req: express.Request, res: express.Response) => {
    ResponseService.success('Pong', res);
  },

  getDocumentation: (_req: express.Request, res: express.Response) => {
    ResponseService.redirect('https://documenter.getpostman.com/view/8555555/SWT5gzbe?version=latest', res);
  },

  resetDatabase: async (req: express.Request, res: express.Response) => {
    // Safeguard to ensure this isn't trigerred accidentally
    if (req.params.code !== process.env.PURGE_CODE) {
      ResponseService.failed('Invalid purge code', res);
      return false;
    } 

    await MongoService.deleteEverything();
    ResponseService.failed('Database successfully purged', res);
    return true;
  }
}