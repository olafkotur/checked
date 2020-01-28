// import express from 'express';

// export const AssemblyService = {

//   createPoint: async (req: express.Request, res: express.Response) => {},
//   getPoint: async (req: express.Request, res: express.Response) => {},
//   getPoints: async (req: express.Request, res: express.Response) => {},
//   deletePoint: async (req: express.Request, res: express.Response) => {},

// };

// // const data: IDbActivity = {
// //   activityId: await DbHelperService.assignAvailableId('activity', 'activityId'),
// //   name: req.body.name || '',
// //   zoneId: parseInt(req.body.zoneId || '0'),
// //   createdAt: new Date(),
// //   lastUpdated: new Date()
// // };

// // // Ensure that the zone exists before continuing
// // const zoneExists: boolean = await DbHelperService.exists('zones', { zoneId: data.zoneId });
// // if (!zoneExists) {
// //   ResponseService.bad('Cannot create an activity without a valid zone id', res);
// //   return false;
// // }

// // // Ensure that an activity with the same zoneId does not already exist
// // await DbHelperService.exists('activity', { zoneId: data.zoneId }).then((exists: boolean) => {
// //   if (!exists) {
// //     MongoService.insertOne('activity', data);
// //     ResponseService.create({ activityId: data.activityId }, res);
// //   } else {
// //     ResponseService.bad('Activity in that zone already exists', res);
// //   }
// // });

// // return true;