import express from 'express';
import { ResponseService } from '../services/response';
import { TLegalCopy, LegalCopyTypes, LegalCopy } from '../types/imports';
import { IDbConsentForm } from '../types/db';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import moment from 'moment';
import { IConsentFormResponse } from '../types/response';

export const LegalHandler = {

  getLegalCopy: (req: express.Request, res: express.Response) => {
    // Check that the copy type exists
    if (!LegalCopyTypes.includes(req.params.copyType)) {
      return ResponseService.bad('The requested copy type does not exist, make sure its correctly spelt', res);
    }

    const copyType: TLegalCopy = req.params.copyType as TLegalCopy;
    return ResponseService.data(LegalCopy[copyType], res);
  },

  updateConsentByMember: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.params.memberId || '0');

    // Ensure that the member exists before attempting to delte
    const exists: boolean = await DbHelperService.exists('members', { memberId });
    if (!exists) {
      return ResponseService.notFound('Member does not exist', res);
    }

    // Check that the entry exists before updating
    const previousConsent: any = await MongoService.findOne('consent', { memberId });
    if (!previousConsent) {
      return ResponseService.bad('This should never happen, so let me know if you see this', res);
    }

    const data: IDbConsentForm = {
      memberId,
      isAccepeted: req.body.isAccepted === 'true',
      createdAt: previousConsent.createdAt,
      lastUpdated: new Date()
    };
    
    await MongoService.updateOne('consent', { memberId }, data);
    return ResponseService.ok('Consent entry has been updated', res);
  },

  getConsentByMember: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('consent', { memberId: parseInt(req.params.memberId || '0') });
    if (!data) {
      return ResponseService.data({}, res);
    }

    // Convert to a response friendly format
    const formatted: IConsentFormResponse = {
      memberId: data.memberId,
      isAccepeted: data.isAccepted,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix()
    };
  
    return ResponseService.data(formatted, res);
  }

};
