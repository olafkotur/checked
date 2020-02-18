import express from 'express'
import { ResponseService } from '../services/response';
import { MongoService } from '../services/mongo';
import { DbHelperService } from '../services/dbHelper';
import { IDbComment } from '../types/db';
import { ICommentResponse } from '../types/response';
import moment from 'moment';

export const CommentHandler = {
  createComment: async (req: express.Request, res: express.Response) => {
    const memberId: number = parseInt(req.body.memberId || '0');
    const exists: boolean = await DbHelperService.exists('members', { memberId });
    if (!exists) {
      ResponseService.bad('Cannot create a new comment without a valid member id', res);
      return false;
    }

    const data: IDbComment = {
      memberId,
      commentId: await DbHelperService.assignAvailableId('comments', 'commentId'),
      rating: parseInt(req.body.rating || '0'),
      value: req.body.value || '',
      createdAt: new Date(),
    };

    MongoService.insertOne('comments', data);
    ResponseService.ok('Added to collection', res);
    return true;
  },

  deleteComment: async (req: express.Request, res: express.Response) => {
    const commentId: number = parseInt(req.params.commentId || '0');
    const exists: boolean = await DbHelperService.exists('comments', { commentId });
    if (!exists) {
      ResponseService.notFound('Cannot delete comment that does not exist', res);
      return false;
    }

    MongoService.deleteOne('comments', { commentId })
    ResponseService.ok('Comment was successfully deleted', res)
    return true;
  },

  getComments: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('comments', { memberId: parseInt(req.params.memberId || '0') });
    if (data === null) {
      ResponseService.data([], res);
      return false;
    }

    const formatted: ICommentResponse[] = data.map((comment: IDbComment) => {
      return {
        commentId: comment.commentId,
        memberId: comment.memberId,
        rating: comment.rating,
        value: comment.value,
        createdAt: moment(data.createdAt).unix(),
      }
    });

    ResponseService.data(formatted, res);
    return true;
  },

  getComment: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('comments', { commentId: parseInt(req.params.commentId || '0') });
    if (data === null) {
      ResponseService.data({}, res);
      return false;
    }

    const formatted: ICommentResponse = {
      commentId: data.commentId,
      memberId: data.memberId,
      rating: data.rating,
      value: data.value,
      createdAt: moment(data.createdAt).unix(),
    };

    ResponseService.data(formatted, res);
    return true;
  },
};

