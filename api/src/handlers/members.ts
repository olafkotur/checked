import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';
import { DbHelperService } from '../services/dbHelper';
import { IMemberResponse } from '../types/response';
import { IDbMember } from '../types/db';
import { AuthService } from '../services/auth';

export const MemberHandler = {

  createMember: async (req: express.Request, res: express.Response) => {
    // Check if user exists before assigning them a member
    const user: any = await MongoService.findOne('users', { userId: parseInt(req.body.userId || '')})
    if (!user) {
      return ResponseService.notFound('Admin user does not exist', res);
    }

    // Generate a id and secure password for the member
    const memberId: number = await DbHelperService.assignAvailableId('members', 'memberId');
    const securePassword: string = AuthService.generateSecurePassword();

    // Create a default entry for the consent form
    await MongoService.insertOne('consent', {
      memberId,
      isAccepted: false,
      createdAt: new Date(),
      lastUpdated: new Date()
    });

    const data: IDbMember = {
      memberId,
      userId: parseInt(req.body.userId || '0'),
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      password: securePassword,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    await MongoService.insertOne('members', data);
    return ResponseService.create({ memberId: data.memberId }, res);
  },

  deleteMember: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.params.memberId || '0');

    // Ensure that the member exists before attempting to delte
    const exists: boolean = await DbHelperService.exists('members', { memberId });
    if (!exists) {
      return ResponseService.notFound('Member does not exist', res);
    }

    await MongoService.deleteOne('members', { memberId });
    return ResponseService.ok('Deleted existing member', res);    
  },

  getMember: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('members', { memberId: parseInt(req.params.memberId || '0') });
    if (data === null) {
      return ResponseService.data({}, res);
    }

    const formatted: IMemberResponse =  {
      memberId: data.memberId,
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix()

    };

    return ResponseService.data(formatted, res);
  },

  getMembers: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('members', {});
    if (data === null) {
      return ResponseService.data([], res);
    }

    const formatted: IMemberResponse[] = data.map((member: IDbMember) => {
      return {
        memberId: member.memberId,
        userId: member.userId,
        firstName: member.firstName,
        lastName: member.lastName,
        password: member.password,
        createdAt: moment(data.createdAt).unix(),
        lastUpdated: moment(data.lastUpdated).unix()
      }
    });

    return ResponseService.data(formatted, res);
  },

  getMembersByUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('members', { userId: parseInt(req.params.userId || '')});
    if (data === null) {
      return ResponseService.data([], res);
    }

    const formatted: IMemberResponse[] = data.map((member: IDbMember) => {
      return {
        memberId: member.memberId,
        userId: member.userId,
        firstName: member.firstName,
        lastName: member.lastName,
        password: member.password,
        createdAt: moment(data.createdAt).unix(),
        lastUpdated: moment(data.lastUpdated).unix()
      }
    });

    return ResponseService.data(formatted, res);
  },

  login: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.body.memberId || '0');
    // const hashedPassword: string = AuthService.hashValue(req.body.password || ''); TODO: This ideally should be turned on

    const data: any = await MongoService.findOne('members', { memberId });
    if (!data) {
      return ResponseService.unauthorized('Member identification number or password is incorrect', res);
    }

    // Check if credentials are correct
    if (data.memberId === memberId) {
      if (data.password === req.body.password) {
        return ResponseService.data(data, res);
      }
    }

    // Default to unauthorized
    return ResponseService.unauthorized('Member identification number or password is incorrect', res);
  },
};