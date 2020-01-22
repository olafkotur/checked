import { MongoService } from '../services/mongo';
import { IDbUser, IDbMember } from '../types/db';
import { ValidLiveCollections } from '../types/imports';

export const DbHelperService = {

  isValidLiveCollection: (collection: string): boolean => {
    let exists: boolean = false;
    ValidLiveCollections.forEach((col: string) => {
      collection === col ? exists = true : exists = false;
    });

    return exists;
  },

  exists: async (collection: string, data: any): Promise<boolean> =>{
    const existingValue = await MongoService.findOne(collection, data);
    if (existingValue) {
      return true;
    } else {
      return false;
    }
  },

  assignUserId: async (): Promise<number> => {
    const users: any = await MongoService.findMany('users', {});

    // Find the next available user id from the database
    let highestId: number = 0;
    users.forEach((user: IDbUser) => {
      if (user.userId >= highestId) {
        highestId = user.userId + 1;
      }
    });
    return highestId;
  },

  assignMemberId: async (): Promise<number> => {
    const members: any = await MongoService.findMany('members', {});

    // Find the next available member id from the database
    let highestId: number = 0;
    members.forEach((member: IDbMember) => {
      if (member.memberId >= highestId) {
        highestId = member.memberId + 1;
      }
    });
    return highestId;
  },
}