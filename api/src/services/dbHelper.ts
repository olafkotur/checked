import { MongoService } from '../services/mongo';
import { ValidCollections } from '../models';

export const DbHelperService = {

  isValidCollection: (collection: string): boolean => {
    let exists: boolean = false;
    ValidCollections.forEach((col: string) => {
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