import express from 'express';
import bodyParser from 'body-parser';
import { MongoService } from './services/mongo';
import { LiveHandler } from './handlers/live';
import { LocationHandler } from './handlers/location';
import { MiscHandler } from './handlers/misc';
import { ZoneHandler } from './handlers/zone';
import { UserHandler } from './handlers/users';
import { MemberHandler } from './handlers/members';
import { ActivityHandler } from './handlers/activity';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app: express.Application = express();

async function main() {
  await MongoService.connect();

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Live handlers
  app.post('/api/live/upload', LiveHandler.uploadLiveData);
  app.get('/api/live/:type', LiveHandler.getLiveData);
  app.get('/api/live/:type/:sensorId', LiveHandler.getSingleLiveData);

  // Location handlers
  app.post('/api/location/upload', LocationHandler.uploadLocationData);
  app.get('/api/location', LocationHandler.getLocationData);
  app.get('/api/location/:sensorId', LocationHandler.getSingleLocationData);

  // Zone handlers
  app.post('/api/zones/create', ZoneHandler.createZone);
  app.post('/api/zones/update/:zoneId', ZoneHandler.updateZone);
  app.delete('/api/zones/delete/:zoneId', ZoneHandler.deleteZone);
  app.get('/api/zones', ZoneHandler.getZoneData);
  app.get('/api/zones/:zoneId', ZoneHandler.getSingleZoneData);

  // User handlers
  app.post('/api/users/create', UserHandler.createUser);
  app.post('/api/users/login', UserHandler.login);
  app.delete('/api/users/delete/:userId', UserHandler.deleteUser);
  app.get('/api/users/:userId', UserHandler.getUser);
  app.get('/api/users', UserHandler.getUsers);

  // Member handlers
  app.post('/api/members/create', MemberHandler.createMember);
  app.delete('/api/members/delete/:memberId', MemberHandler.deleteMember);
  app.get('/api/members/:memberId', MemberHandler.getMember);
  app.get('/api/members', MemberHandler.getMembers);
  app.get('/api/members/user/:adminUsername', MemberHandler.getMembersByUser);

  // Activity handlers
  app.post('/api/activity/create', ActivityHandler.createActivity);

  // Misc handlers
  app.get('/api/ping', MiscHandler.getPingResponse);
  app.get('/api/docs', MiscHandler.getDocumentation);
  app.get('/api/danger/purge/:code', MiscHandler.resetDatabase);

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

} main();