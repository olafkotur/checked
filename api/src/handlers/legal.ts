import express from 'express';
import { ResponseService } from '../services/response';
import { TLegalCopy, LegalCopyTypes, LegalCopy } from '../types/imports';
import { IDbAgreementForm } from '../types/db';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import moment from 'moment';
import { IAgreementFormResponse } from '../types/response';

export const LegalHandler = {

  getLegalCopy: (req: express.Request, res: express.Response) => {
    // Check that the copy type exists
    if (!LegalCopyTypes.includes(req.params.copyType)) {
      return ResponseService.bad('The requested copy type does not exist, make sure its correctly spelt', res);
    }

    const copyType: TLegalCopy = req.params.copyType as TLegalCopy;
    return ResponseService.data(LegalCopy[copyType], res);
  },

  updateAgreementByUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');

    // Ensure that the member exists before attempting to delte
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      return ResponseService.notFound('User does not exist', res);
    }

    // Check that the entry exists before updating
    let previous: any = await MongoService.findOne('agreement', { id: userId, idType: 'user', agreementType: req.body.agreementType });
    if (!previous) {
      // Upload into the database if not exists
      await MongoService.insertOne('agreement', {
        id: userId,
        agreementType: req.body.agreementType,
        idType: 'user',
        isAccepted: false,
        createdAt: new Date(),
        lastUpdated: new Date()
      });
      
      // Fetch again
      previous = await MongoService.findOne('agreement', { id: userId, idType: 'user', agreementType: req.body.agreementType });
      console.log(previous);
    }

    const data: IDbAgreementForm = {
      id: userId,
      agreementType: req.body.agreementType,
      idType: 'user',
      isAccepted: req.body.isAccepted === 'true',
      createdAt: previous.createdAt,
      lastUpdated: new Date()
    };
    
    await MongoService.updateOne('agreement', { id: userId, idType: 'user', agreementType: req.body.agreementType }, data);
    return ResponseService.ok('Agreement entry has been updated', res);
  },

  updateAgreementByMember: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.params.memberId || '0');

    // Ensure that the member exists before attempting to delte
    const exists: boolean = await DbHelperService.exists('members', { memberId });
    if (!exists) {
      return ResponseService.notFound('Member does not exist', res);
    }

    // Check that the entry exists before updating
    let previous: any = await MongoService.findOne('agreement', { id: memberId, idType: 'member', agreementType: req.body.agreementType });
    if (!previous) {
      // Upload into the database if not exists
      await MongoService.insertOne('agreement', {
        id: memberId,
        agreementType: req.body.agreementType,
        idType: 'member',
        isAccepted: false,
        createdAt: new Date(),
        lastUpdated: new Date()
      });
      
      // Fetch again
      previous = await MongoService.findOne('agreement', { id: memberId, idType: 'member', agreementType: req.body.agreementType });
    }

    const data: IDbAgreementForm = {
      id: memberId,
      agreementType: req.body.agreementType,
      idType: 'member',
      isAccepted: req.body.isAccepted === 'true',
      createdAt: previous.createdAt,
      lastUpdated: new Date()
    };
    
    await MongoService.updateOne('agreement', { id: memberId, idType: 'member', agreementType: req.body.agreementType }, data);
    return ResponseService.ok('Agreement entry has been updated', res);
  },

  getAgreementByUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('agreement', { id: parseInt(req.params.userId || '0'), idType: 'user', agreementType: req.params.agreementType });
    if (!data) {
      return ResponseService.data({}, res);
    }

    // Convert to a response friendly format
    const formatted: IAgreementFormResponse = {
      userId: data.id,
      agreementType: data.agreementType,
      idType: data.idType,
      isAccepted: data.isAccepted,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix()
    };

    return ResponseService.data(formatted, res);
  },

  getAgreementByMember: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('agreement', { id: parseInt(req.params.memberId || '0'), idType: 'member', agreementType: req.params.agreementType });
    if (!data) {
      return ResponseService.data({}, res);
    }

    // Convert to a response friendly format
    const formatted: IAgreementFormResponse = {
      memberId: data.id,
      agreementType: data.agreementType,
      idType: data.idType,
      isAccepted: data.isAccepted,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix()
    };

    return ResponseService.data(formatted, res);
  }
};
