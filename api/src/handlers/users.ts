import express from 'express';
import moment from 'moment';
import { ISimpleResponse, IDbUser, IDbUserWithPassword } from '../models';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { AuthService } from '../services/auth';

export const UserHandler = {

  createUser: async (req: express.Request, res: express.Response) => {
    let response: ISimpleResponse | object = {};

    const hashedPassword: string = AuthService.hashValue(req.body.password);

    const data: IDbUserWithPassword = {
      userId: await DbHelperService.assignUserId(),
      username: req.body.username,
      password: hashedPassword,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Check that a user with the same username does not exist
    await DbHelperService.exists('users', { username: req.body.username }).then((exists: boolean) => {
      if (!exists) {
        MongoService.insertOne('users', data)
        response = { code: "success", message: 'created new user', time: moment().unix() }
      } else {
        response = { code: "failed", message: 'username already taken', time: moment().unix() }
      }
    });

    res.send(response);
  },

  deleteUser: async (req: express.Request, res: express.Response) => {
    let response: ISimpleResponse | object = {};

    const userId: number = parseInt(req.params.userId);

    // Ensure that the zone exists before attempting to delte
    await DbHelperService.exists('users', { userId: userId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('users', { userId: userId });
        response = { code: "success", message: 'deleted existing user', time: moment().unix() }
      } else {
        response = { code: "failed", message: 'user does not exist', time: moment().unix() }
      }
    });

    res.send(response);
  },

  getSingleUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('users', { userId: parseInt(req.params.userId)} );
    if (data === null) {
      res.send({});
      return false;
    }

    const formatted: IDbUser = {
      userId: data.userId,
      username: data.username,
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
        username: user.username,
        createdAt: user.createdAt,
        lastUpdated: user.lastUpdated
      }
    });

    res.send(formatted);
    return true;
  },

  login: async (req: express.Request, res: express.Response) => {
    let response: ISimpleResponse | object = { code: 'failed', message: 'username or password is incorrect', time: moment().unix() };
    const hashedPassword: string = AuthService.hashValue(req.body.password);

    const data: any = await MongoService.findOne('users', { username: req.body.username });
    if (data === null) {
      res.send(response);
      return false;
    }

    // Check if credentials are correct
    if (data.username === req.body.username) {
      if (data.password === hashedPassword) {
        response = { code: 'success', message: 'user logged in', time: moment().unix() }; 
      }
    }

    res.send(response);
    return true;
  }

}