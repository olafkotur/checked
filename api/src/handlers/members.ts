import express from 'express';
import moment from 'moment';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';
import { DbHelperService } from '../services/dbHelper';
import { IMemberResponse } from '../types/response';
import { IDbMember } from '../types/db';

export const MemberHandler = {

  createMember: async (req: express.Request, res: express.Response) => {
    // Check if admin user exists before assigning them a member
    const admin: any = await MongoService.findOne('users', { userId: parseInt(req.body.userId || '')})
    if (admin === null) {
      ResponseService.notFound('Admin user does not exist', res);
      return false;
    }

    const data: IDbMember = {
      memberId: await DbHelperService.assignAvailableId('members', 'memberId'),
      userId: parseInt(req.body.userId || '0'),
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    MongoService.insertOne('members', data);
    ResponseService.create({ memberId: data.memberId }, res);
    return true;
  },

  deleteMember: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.params.memberId || '0');

    // Ensure that the member exists before attempting to delte
    await DbHelperService.exists('members', { memberId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('members', { memberId });
        ResponseService.ok('Deleted existing member', res);
      } else {
        ResponseService.notFound('Member does not exist', res);
      }
    });
  },

  getMember: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('members', { memberId: parseInt(req.params.memberId || '0') });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    const formatted: IMemberResponse =  {
      memberId: data.memberId,
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix()

    };

    ResponseService.data(formatted, res);
    return true;
  },

  getMembers: async (_req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('members', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    const formatted: IMemberResponse[] = data.map((member: IDbMember) => {
      return {
        memberId: member.memberId,
        userId: member.userId,
        firstName: member.firstName,
        lastName: member.lastName,
        createdAt: moment(data.createdAt).unix(),
        lastUpdated: moment(data.lastUpdated).unix()
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getMembersByUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('members', { userId: parseInt(req.params.userId || '')});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    const formatted: IMemberResponse[] = data.map((member: IDbMember) => {
      return {
        memberId: member.memberId,
        userId: member.userId,
        firstName: member.firstName,
        lastName: member.lastName,
        createdAt: moment(data.createdAt).unix(),
        lastUpdated: moment(data.lastUpdated).unix()
      }
    });

    ResponseService.data(formatted, res);
    return true;
  }

};