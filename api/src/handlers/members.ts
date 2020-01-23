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
    const admin: any = await MongoService.findOne('users', { username: req.body.adminUsername })
    if (admin === null) {
      ResponseService.notFound('Admin user does not exist', res);
      return false;
    }

    const data: IDbMember = {
      memberId: await DbHelperService.assignAvailableId('members', 'memberId'),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      adminUsername: req.body.adminUsername,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    MongoService.insertOne('members', data);
    ResponseService.create('Created new member', res);
    return true;
  },

  deleteMember: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.params.memberId);

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
    const data: any = await MongoService.findOne('members', { memberId: parseInt(req.params.memberId) });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    const formatted: IMemberResponse =  {
      memberId: data.memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      adminUsername: data.adminUsername,
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
        firstName: member.firstName,
        lastName: member.lastName,
        adminUsername: member.adminUsername,
        createdAt: moment(data.createdAt).unix(),
        lastUpdated: moment(data.lastUpdated).unix()
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getMembersByUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('members', { adminUsername: req.params.adminUsername });
    console.log(data);
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    const formatted: IMemberResponse[] = data.map((member: IDbMember) => {
      return {
        memberId: member.memberId,
        firstName: member.firstName,
        lastName: member.lastName,
        adminUsername: member.adminUsername,
        createdAt: moment(data.createdAt).unix(),
        lastUpdated: moment(data.lastUpdated).unix()
      }
    });

    ResponseService.data(formatted, res);
    return true;
  }

};