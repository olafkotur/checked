import express from 'express';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { AuthService } from '../services/auth';
import { ResponseService } from '../services/response';
import { IDbUser, IDbSettings } from '../types/db';
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
      return ResponseService.bad('Please enter a valid email address', res);
    }
    if (data.password.length < 6) {
      return ResponseService.bad('Password must be at least 6 characters', res);
    }

    // Check that a user with the same email does not exist
    const exists: boolean = await DbHelperService.exists('users', { email: req.body.email });
    if (exists) {
      return ResponseService.bad('Email address already taken', res);
    }

    // Create a new settings document for the user
    const settings: IDbSettings = {
      userId: data.userId,
      logoImage: '',
      createdAt: new Date(),
      lastUpdated: new Date()
    }

    // Add user to the database and send an email verification
    const body: string = EmailService.generateRegistrationBody();
    await MongoService.insertOne('users', data);
    await MongoService.insertOne('settings', settings);
    await EmailService.send('Email Verification', data.email, body);
    return ResponseService.create(data, res);
  },

  deleteUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');

    // Ensure that the user exists before attempting to delete
    const exists: boolean = await DbHelperService.exists('users', { email: req.body.email });
    if (!exists) {
      return ResponseService.notFound('User does not exist', res);
    }

    // Delete user from the database
    await MongoService.deleteOne('users', { userId });
    return ResponseService.ok('Deleted existing user', res);
  },

  getUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('users', { userId: parseInt(req.params.userId || '0')} );
    if (data === null) {
      return ResponseService.data({}, res);
    }

    // Convert to a response friendly format
    const formatted: IUserResponse = {
      userId: data.userId,
      email: data.email,
      companyName: data.companyName || '',
      isGuardian: data.isGuardian,
      policyAccepted: data.policyAccepted,
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated
    };

    return ResponseService.data(formatted, res);
  },

  getUsers: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('users', {});
    if (data === null) {
      return ResponseService.data([], res);
    }

    // Convert to a response friendly format
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

    return ResponseService.data(formatted, res);
  },

  login: async (req: express.Request, res: express.Response) => {
    const hashedPassword: string = AuthService.hashValue(req.body.password || '');

    const data: any = await MongoService.findOne('users', { email: req.body.email || '' });
    if (data === null) {
      return ResponseService.unauthorized('Email address or password is incorrect', res);
    }

    // Check if credentials are correct
    if (data.email === req.body.email || '') {
      if (data.password === hashedPassword) {
        return ResponseService.data({ 
          userId: data.userId,
          email: data.email,
          companyName: data.companyName,
          isGuardian: data.isGuardian,
          policyAccepted: data.policyAccepted
        }, res);
      }
    }

    // Default to unauthorized
    return ResponseService.unauthorized('Email address or password is incorrect', res);
  },

  updateUser: async (req: express.Request, res: express.Response) => {
    const user: any = await MongoService.findOne('users', { userId: parseInt(req.params.userId || '0')} );
    if (user === null) {
      return ResponseService.notFound('User does not exist', res);
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
    return ResponseService.ok('Updated existing user', res);
  },

}