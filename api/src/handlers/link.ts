import express from 'express';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { MongoService } from '../services/mongo';
import { IDbLink } from '../types/db';
import { ILinkResponse } from '../types/response';
import moment from 'moment';

export const LinkHandler = {
  
  createLink: async (req: express.Request, res: express.Response) => {
    let exists: boolean = false;

    // Check that the user exists
    const userId: number = parseInt(req.body.userId || '0');
    exists = await DbHelperService.exists('users', { userId });
    if (!exists) {
      ResponseService.bad('Cannot link a user to a member without a valid userId', res);
      return false;
    }
    
    // Check that the member exists
    const memberId: number = parseInt(req.body.memberId || '0');
    exists = await DbHelperService.exists('members', { memberId });
    if (!exists) {
      ResponseService.bad('Cannot link a user to a member without a valid memberId', res);
      return false;
    }

    // Check that the link does not already exist
    exists = await DbHelperService.exists('links', { userId, memberId });
    if (exists) {
      ResponseService.bad('A link between this user and member already exists', res);
      return false;
    }

    // Format link data
    const linkId: number = await DbHelperService.assignAvailableId('links', 'linkId');
    const data: IDbLink = {
      linkId,
      userId,
      memberId,
      relationship: req.body.relationship || '',
      createdAt: new Date()
    };

    // Add new link
    await MongoService.insertOne('links', data);
    ResponseService.create({ linkId }, res);
    return true;
  },
  
  deleteLink: async (req: express.Request, res: express.Response) => {
    const linkId: number = parseInt(req.params.linkId || '0');

    // Ensure that the user exists before attempting to delte
    await DbHelperService.exists('links', { linkId }).then((exists: boolean) => {
      if (exists) {
        MongoService.deleteOne('links', { linkId });
        ResponseService.ok('Deleted existing link', res);
      } else {
        ResponseService.notFound('Link does not exist', res);
      }
    });  
  },

  getLinksByUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');
    const data: any = await MongoService.findMany('links', { userId });
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Convert to response format
    const formatted: ILinkResponse[] = data.map((val: ILinkResponse) => {
      return {
        linkId: val.linkId,
        userId: val.userId,
        memberId: val.memberId,
        relationship: val.relationship,
        createdAt: moment(val.createdAt).unix()
      };
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getLinksByMember: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.params.memberId || '0');
    const data: any = await MongoService.findMany('links', { memberId });
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Convert to response format
    const formatted: ILinkResponse[] = data.map((val: ILinkResponse) => {
      return {
        linkId: val.linkId,
        userId: val.userId,
        memberId: val.memberId,
        relationship: val.relationship,
        createdAt: moment(val.createdAt).unix()
      };
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getAllLinks: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('links', {});
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    // Convert to response format
    const formatted: ILinkResponse[] = data.map((val: ILinkResponse) => {
      return {
        linkId: val.linkId,
        userId: val.userId,
        memberId: val.memberId,
        relationship: val.relationship,
        createdAt: moment(val.createdAt).unix()
      };
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getLink: async (req: express.Request, res: express.Response) => {
    const linkId: number = parseInt(req.params.linkId || '0');
    const data: any = await MongoService.findOne('links', { linkId });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    // Convert to response format
    const formatted: ILinkResponse = {
      linkId: data.linkId,
      userId: data.userId,
      memberId: data.memberId,
      relationship: data.relationship,
      createdAt: moment(data.createdAt).unix()
    };

    ResponseService.data(formatted, res);
    return true;
  },
};
