import express from 'express';
import moment from 'moment';
import { ISimpleResponse } from '../models';

export const PingHandler = {

  getPingResponse: (_req: express.Request, res: express.Response) => {
    const response: ISimpleResponse = {
      value: 'PONG',
      time: moment().unix(),
    };

    res.send(response);
  }
}