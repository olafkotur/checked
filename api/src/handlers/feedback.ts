import express from 'express'
import { ResponseService } from '../services/response';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { IDbFeedback } from '../types/db';
import { IFeedbackResponse } from '../types/response';
import moment from 'moment';

export const FeedbackHandler = {

  createFeedback: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.body.userId || '0');
    const memberId: number = parseInt(req.body.memberId || '0');

    // Check that the user exists before creating feedback
    let exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      return ResponseService.bad('Cannot create new feedback without a valid userId', res);
    }

    // Check that the member exists before creating feedback
    exists = await DbHelperService.exists('members', { memberId });
    if (!exists) {
      return ResponseService.bad('Cannot create new feedback without a valid memberId', res);
    }

    const data: IDbFeedback = {
      feedbackId: await DbHelperService.assignAvailableId('feedback', 'feedbackId'),
      userId,
      memberId,
      rating: parseInt(req.body.rating || '0'),
      image: req.body.image,
      value: req.body.value,
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    await MongoService.insertOne('feedback', data);
    return ResponseService.create(data, res);
  },

  getFeedback: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('feedback', { feedbackId: parseInt(req.params.feedbackId || '0') })
    if (!data) {
      return ResponseService.data({}, res);
    }

    // Convert to response friendly format
    const formatted: IFeedbackResponse = {
      feedbackId: data.feedbackId,
      userId: data.userId,
      memberId: data.memberId,
      rating: data.rating,
      image: data.image,
      value: data.value,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix()
    };

    return ResponseService.data(formatted, res);
  },

  getFeedbackByUser: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('feedback', { userId: parseInt(req.params.userId || '0') })
    if (!data) {
      return ResponseService.data([], res);
    }

    // Convert to response friendly format
    const formatted: IFeedbackResponse[] = data.map((feedback: IDbFeedback) => {
      return {
        feedbackId: feedback.feedbackId,
        userId: feedback.userId,
        memberId: feedback.memberId,
        rating: feedback.rating,
        image: feedback.image,
        value: feedback.value,
        createdAt: moment(feedback.createdAt).unix(),
        lastUpdated: moment(feedback.lastUpdated).unix()
      };
    });

    return ResponseService.data(formatted, res);
  },

  getFeedbackByMember: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('feedback', { memberId: parseInt(req.params.memberId || '0') })
    if (!data) {
      return ResponseService.data([], res);
    }

    // Convert to response friendly format
    const formatted: IFeedbackResponse[] = data.map((feedback: IDbFeedback) => {
      return {
        feedbackId: feedback.feedbackId,
        userId: feedback.userId,
        memberId: feedback.memberId,
        rating: feedback.rating,
        image: feedback.image,
        value: feedback.value,
        createdAt: moment(feedback.createdAt).unix(),
        lastUpdated: moment(feedback.lastUpdated).unix()
      };
    });

    return ResponseService.data(formatted, res);
  },
};

