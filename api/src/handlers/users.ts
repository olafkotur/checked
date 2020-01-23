import express from 'express';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { AuthService } from '../services/auth';
import { ResponseService } from '../services/response';
import { IDbUser } from '../types/db';
import { IUserResponse } from '../types/response';

export const UserHandler = {

  createUser: async (req: express.Request, res: express.Response) => {
    const hashedPassword: string = AuthService.hashValue(req.body.password);

    const data: IDbUser = {
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
        ResponseService.create('Created new user', res);
      } else {
        ResponseService.bad('Username already taken', res);
      }
    });
  },

  deleteUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId);

    // Ensure that the user exists before attempting to delte
    await DbHelperService.exists('users', { userId: userId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('users', { userId: userId });
        ResponseService.ok('Deleted existing user', res);
      } else {
        ResponseService.notFound('User does not exist', res);
      }
    });
  },

  getUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('users', { userId: parseInt(req.params.userId)} );
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    const formatted: IUserResponse = {
      userId: data.userId,
      username: data.username,
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated
    };

    ResponseService.data(formatted, res);
    return false;
  },

  getUsers: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('users', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    const formatted: IUserResponse[] = data.map((user: IDbUser) => {
      return {
        userId: user.userId,
        username: user.username,
        createdAt: user.createdAt,
        lastUpdated: user.lastUpdated
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },

  login: async (req: express.Request, res: express.Response) => {
    const hashedPassword: string = AuthService.hashValue(req.body.password);

    const data: any = await MongoService.findOne('users', { username: req.body.username });
    if (data === null) {
      ResponseService.unauthorized('Username or password is incorrect', res);
      return false;
    }

    // Check if credentials are correct
    if (data.username === req.body.username) {
      if (data.password === hashedPassword) {
        ResponseService.ok('User logged in', res);
      }
    }

    return true;
  }

}