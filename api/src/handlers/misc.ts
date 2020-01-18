import express from 'express';
import moment from 'moment';
import { ISimpleResponse } from '../models';

export const MiscHandler = {

  getPingResponse: (_req: express.Request, res: express.Response) => {
    const response: ISimpleResponse = {
      value: 'PONG',
      time: moment().unix(),
    };

    res.send(response);
  },

  getDocumentation: (_req: express.Request, res: express.Response) => {
    res.redirect('https://documenter.getpostman.com/view/8555555/SWT5gzbe?version=latest');
  }
}