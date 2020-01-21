import express from 'express';
import moment from 'moment';
import { ISimpleResponse, IDbUser, IDbUserWithPassword } from '../models';
import { MongoService } from '../services/mongo';

export const MiscHandler = {

  createUser: async (req: express.Request, res: express.Response) => {},

  deleteUser: async (req: express.Request, res: express.Response) => {},

  getSingleUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('users', { userId: parseInt(req.params.userId)} );
    if (data === null) {
      res.send({});
      return false;
    }

    const formatted: IDbUser = {
      userId: data.userId,
      userName: data.userName,
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated
    };

    res.send(formatted);
    return false;
  },

  getUsers: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('users', {});
    if (data === null) {
      res.send([]);
      return false;
    }

    const formatted: IDbUser[] = data.map((user: IDbUserWithPassword ) => {
      return {
        userId: user.userId,
        userName: user.userName,
        createdAt: user.createdAt,
        lastUpdated: user.lastUpdated
      }
    });

    res.send(formatted);
    return true;
  },

}