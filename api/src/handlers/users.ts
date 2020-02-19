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
      isGuardian: req.body.isGuardian === 'true',
      policyAccepted: req.body.policyAccepted === 'true',
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
        ResponseService.create({
          userId: data.userId,
          email: data.email,
          companyName: data.companyName,
          isGuardian: data.isGuardian,
          policyAccepted: data.policyAccepted
        }, res);

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
    await DbHelperService.exists('users', { userId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('users', { userId });
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
      isGuardian: data.isGuardian,
      policyAccepted: data.policyAccepted,
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
        isGuardian: user.isGuardian,
        policyAccepted: user.policyAccepted,
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
        ResponseService.data({ 
          userId: data.userId,
          email: data.email,
          companyName: data.companyName,
          isGuardian: data.isGuardian,
          policyAccepted: data.policyAccepted
        }, res);
        return true;
      }
    }

    // Default to unauthorized
    ResponseService.unauthorized('Email address or password is incorrect', res);
    return false;
  },

  updateUser: async (req: express.Request, res: express.Response) => {
    const user: any = await MongoService.findOne('users', { userId: parseInt(req.params.userId || '0')} );
    if (user === null) {
      ResponseService.notFound('User does not exist', res);
      return false;
    }

    const hashedPassword: string = AuthService.hashValue(req.body.password || '');

    // Update only provided data using old data as fallback
    const data: IDbUser = {
      userId: user.userId,
      email: req.body.email || user.email,
      password: req.body.password ? hashedPassword : user.password,
      companyName: req.body.companyName || user.companyName,
      isGuardian: req.body.isGuardian ? req.body.isGuardian === 'true' : user.isGuardian,
      policyAccepted: req.body.policyAccepted ? req.body.policyAccepted === 'true' : user.policyAccepted,
      createdAt: user.createdAt,
      lastUpdated: new Date()
    }

    // Update the user
    await MongoService.deleteOne('users', { userId: user.userId });
    await MongoService.insertOne('users', data);
    ResponseService.ok('Updated existing user', res);

    return true;
  },

}