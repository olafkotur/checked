import { MongoService } from '../services/mongo';
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

  assignAvailableId: async (collection: string, id: string): Promise<number> => {
    const data: any = await MongoService.findMany(collection, {});

    // Find the next available id in the database 
    let highestId: number = 1;
    data.forEach((obj: any) => {
      if (obj[id] >= highestId) {
        highestId = obj[id] + 1;
      }
    });
    return highestId;
  }
}