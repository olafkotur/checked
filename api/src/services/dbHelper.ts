import { MongoService } from '../services/mongo';
import { ValidLiveCollections } from '../models';

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
}