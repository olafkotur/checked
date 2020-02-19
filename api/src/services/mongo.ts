const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

let database: any = null;

export const MongoService = {

  connect: () => new Promise((resolve: any) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, async (error: Error, db: any) => {
      if (error) {
        throw error;
      }
      database = await db.db('data')
      console.log(`MongoService: Succesfully connected to database`)
      resolve(true);
    });
  }),

  insertOne: async (collection: string, data: any) => {
    await database.collection(collection).insertOne(data, (error: Error) => {
    if (error) {
      throw error;
    }
    console.log('MongoService: Added 1 document');
    });
  },

  insertMany: async (collection: string, data: any) => {
    await database.collection(collection).insertMany(data, (error: Error) => {
    if (error) {
      throw error;
    }
    console.log(`MongoService: Added ${data.length} documents`);
    });
  },

  updateOne: async (collection: string, query: any, data: any) => {
    await database.collection(collection).replaceOne(query, data, (error: Error) => {
    if (error) {
      throw error;
    }
    console.log('MongoService: Updated 1 document');
    });
  },

  findOne: (collection: string, query: any) => {
    return new Promise((resolve: any) => {
      database.collection(collection).findOne(query, (error: Error, res: any) => {
        if (error) {
          throw error;
        }
        resolve(res);
      });
    });
  },

  findMany: (collection: string, query: any) => {
    return new Promise((resolve: any) => {
      database.collection(collection).find(query, (error: Error, res: any) => {
        if (error) {
          throw error;
        }
        resolve(res.toArray());
      });
    });
  },

  deleteOne: async (collection: string, query: any) => {
    await database.collection(collection).deleteOne(query, (error: Error) => {
      if (error) {
        throw error;
      }
    });
  },

  deleteMany: async (collection: string, query: any) => {
    await database.collection(collection).deleteMany(query, (error: Error) => {
      if (error) {
        throw error;
      }
    });
  },

  deleteEverything: async () => {
    await database.dropDatabase();
    console.log('MongoService: Purge requested, database reset to default');
  }
}