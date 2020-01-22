import express from 'express';
import { MongoService } from '../services/mongo';
import { ResponseService } from '../services/response';
import { IMemberResponse } from '../models/response';

export const MemberHandler = {

  addMember: (req: express.Request, res: express.Response) => {},

  removeMember: (req: express.Request, res: express.Response) => {},

  getSingleMember: (req: express.Request, res: express.Response) => {},

  getMembers: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('members', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    const formatted: IMemberResponse = {

    };

    ResponseService.data(formatted, res);
  },

};