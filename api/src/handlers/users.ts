import express from 'express';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { AuthService } from '../services/auth';
import { ResponseService } from '../services/response';
import { IDbUser } from '../types/db';
import { IUserResponse } from '../types/response';
import { EmailService } from '../services/email';

export const UserHandler = {

  createUser: async (req: express.Request, res: express.Response) => {
    const hashedPassword: string = AuthService.hashValue(req.body.password || '');

    const data: IDbUser = {
      userId: await DbHelperService.assignAvailableId('users', 'userId'),
      email: req.body.email || '',
      password: hashedPassword,
      companyName: req.body.companyName || '',
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    // Ensure valid email and password is provided
    if (data.email === '' || !data.email.includes('@')) {
      ResponseService.bad('Please enter a valid email address', res);
      return false;
    }
    if (data.password.length < 6) {
      ResponseService.bad('Password must be at least 6 characters', res);
      return false;
    }

    // Check that a user with the same email does not exist
    await DbHelperService.exists('users', { email: req.body.email }).then((exists: boolean) => {
      if (!exists) {
        MongoService.insertOne('users', data)
        ResponseService.create({ userId: data.userId }, res);

        // Send Verification email
        const body: string = EmailService.generateRegistrationBody();
        EmailService.send('Email Verification', data.email, body);

      } else {
        ResponseService.bad('Email address already taken', res);
      }
    });

    return true;
  },

  deleteUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');

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
    const data: any = await MongoService.findOne('users', { userId: parseInt(req.params.userId || '0')} );
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    const formatted: IUserResponse = {
      userId: data.userId,
      email: data.email,
      companyName: data.companyName || '',
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
        email: user.email,
        companyName: user.companyName,
        createdAt: user.createdAt,
        lastUpdated: user.lastUpdated
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },

  login: async (req: express.Request, res: express.Response) => {
    const hashedPassword: string = AuthService.hashValue(req.body.password || '');

    const data: any = await MongoService.findOne('users', { email: req.body.email || '' });
    if (data === null) {
      ResponseService.unauthorized('Email address or password is incorrect', res);
      return false;
    }

    // Check if credentials are correct
    if (data.email === req.body.email || '') {
      if (data.password === hashedPassword) {
        ResponseService.data({ userId: data.userId }, res);
        return true;
      }
    }

    // Default to unauthorized
    ResponseService.unauthorized('Email address or password is incorrect', res);
    return false;
  }

}