import express from 'express';
import moment from 'moment';
import { IResponse, IDataResponse } from '../types/response';

export const ResponseService = {
  ok: (msg: string, res: express.Response) => {
    const response: IResponse = {
      code: 200,
      status: 'ok',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      unix: moment().unix(),
      message: msg,
    };
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(response);
  },

  create: (msg: string, res: express.Response) => {
    const response: IResponse = {
      code: 201,
      status: 'created',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      unix: moment().unix(),
      message: msg,
    };
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(response);
  },

  bad: (msg: string, res: express.Response) => {
    const response: IResponse = {
      code: 400,
      status: 'bad request',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      unix: moment().unix(),
      message: msg,
    };
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(response);
  },

  unauthorized: (msg: string, res: express.Response) => {
    const response: IResponse = {
      code: 401,
      status: 'unauthorized',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      unix: moment().unix(),
      message: msg,
    };
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(response);
  },

  forbidden: (msg: string, res: express.Response) => {
    const response: IResponse = {
      code: 403,
      status: 'forbidden',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      unix: moment().unix(),
      message: msg,
    };
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(response);
  },

  notFound: (msg: string, res: express.Response) => {
    const response: IResponse = {
      code: 404,
      status: 'not found',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      unix: moment().unix(),
      message: msg,
    };
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(response);
  },

  data: (data: any, res: express.Response) => {
    const response: IDataResponse = {
      code: 200,
      status: 'ok',
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      unix: moment().unix(),
      result: data,
    };
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(response);
  },

  redirect: (uri: string, res: express.Response) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.redirect(uri);
  },

};