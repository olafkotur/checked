import { MongoService } from '../services/mongo';
import { IDbUserWithPassword } from '../models';
import { ValidLiveCollections } from '../imports';

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
    users.forEach((user: IDbUserWithPassword) => {
      if (user.userId > highestId) {
        highestId = user.userId + 1;
      }
    });
    return highestId;
  }
}