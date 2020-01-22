import express from 'express';
import { ISuccessResponse, IFailedResponse } from '../models';

export const ResponseService = {

  success: (msg: string, res: express.Response) => {
    const response: ISuccessResponse = {
      code: 200,
      type: 'success',
      message: msg,
      date: new Date()
    };
    res.send(response);
  },

  failed: (msg: string, res: express.Response) => {
    const response: IFailedResponse = {
      code: 200,
      type: 'failed',
      message: msg,
      date: new Date()
    };
    res.send(response);
  },

  data: (data: any, res: express.Response) => {
    const response: any = data;
    res.send(response);
  },

  redirect: (uri: string, res: express.Response) => {
    res.redirect(uri);
  },

};