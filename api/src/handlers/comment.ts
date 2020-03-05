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
      return ResponseService.bad('Cannot create a new comment without a valid member id', res);
    }

    const data: IDbComment = {
      memberId,
      commentId: await DbHelperService.assignAvailableId('comments', 'commentId'),
      rating: parseInt(req.body.rating || '0'),
      value: req.body.value || '',
      image: req.body.image || '',
      createdAt: new Date(),
    };

    await MongoService.insertOne('comments', data);
    return ResponseService.ok('Added to collection', res);
  },

  deleteComment: async (req: express.Request, res: express.Response) => {
    const commentId: number = parseInt(req.params.commentId || '0');
    const exists: boolean = await DbHelperService.exists('comments', { commentId });
    if (!exists) {
      return ResponseService.notFound('Cannot delete comment that does not exist', res);
    }

    await MongoService.deleteOne('comments', { commentId })
    return ResponseService.ok('Comment was successfully deleted', res)
  },

  getCommentsByMember: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findMany('comments', { memberId: parseInt(req.params.memberId || '0') });
    if (!data) {
      return ResponseService.data([], res);
    }

    const formatted: ICommentResponse[] = data.map((comment: IDbComment) => {
      return {
        commentId: comment.commentId,
        memberId: comment.memberId,
        rating: comment.rating,
        value: comment.value,
        image: comment.image,
        createdAt: moment(comment.createdAt).unix(),
      };
    });

    return ResponseService.data(formatted, res);
  },

  getComment: async (req: express.Request, res: express.Response) => {
    const data: any = await MongoService.findOne('comments', { commentId: parseInt(req.params.commentId || '0') });
    if (!data) {
      return ResponseService.data({}, res);
    }

    const formatted: ICommentResponse = {
      commentId: data.commentId,
      memberId: data.memberId,
      rating: data.rating,
      value: data.value,
      image: data.image,
      createdAt: moment(data.createdAt).unix(),
    };

    return ResponseService.data(formatted, res);
  },
};

