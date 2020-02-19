import express from 'express';
import { DbHelperService } from '../services/dbHelper';
import { ResponseService } from '../services/response';
import { MongoService } from '../services/mongo';
import { IDbLink } from '../types/db';

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
    const data: IDbLink = {
      userId,
      memberId,
      relationship: req.body.relationship || '',
      createdAt: new Date()
    };

    // Add new link
    await MongoService.insertOne('links', data);
    ResponseService.create('Added new link between a user and member', res);
    return true;
  },
  
  deleteLink: async (req: express.Request, res: express.Response) => {

  },
};
