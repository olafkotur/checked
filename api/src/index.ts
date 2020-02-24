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
import { AssemblyHandler } from './handlers/assembly';
import { HistoricHandler } from './handlers/historic';
import { CommentHandler } from './handlers/comment';
import { LinkHandler } from './handlers/link';
import { NotificationHandler } from './handlers/notifications';
import { SettingHandler } from './handlers/settings';

const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app: express.Application = express();

async function main() {
  await MongoService.connect();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // Live handlers
  app.post('/api/live/upload', LiveHandler.uploadLiveData);
  app.get('/api/live/:type', LiveHandler.getLiveData);
  app.get('/api/live/:type/:memberId', LiveHandler.getLiveDataByMember);
  app.get('/api/live/:type/zones/:zoneId', LiveHandler.getLiveDataByZone);

  // Historic handlers
  app.post('/api/historic/upload', HistoricHandler.uploadHistoricalData);
  app.get('/api/historic/:userId', HistoricHandler.getHistoricByUser);

  // Location handlers
  app.post('/api/location/upload', LocationHandler.uploadLocationData);
  app.get('/api/location', LocationHandler.getLocationData);
  app.get('/api/location/:memberId', LocationHandler.getSingleLocationData);
  app.get('/api/location/users/:userId', LocationHandler.getLocationByUser);

  // Zone handlers
  app.post('/api/zones/create', ZoneHandler.createZone);
  app.post('/api/zones/update/:zoneId', ZoneHandler.updateZone);
  app.delete('/api/zones/delete/:zoneId', ZoneHandler.deleteZone);
  app.get('/api/zones', ZoneHandler.getZoneData);
  app.get('/api/zones/:zoneId', ZoneHandler.getSingleZoneData);
  app.get('/api/zones/users/:userId', ZoneHandler.getZonesByUser);
  app.get('/api/zones/activity/users/:userId', ZoneHandler.getZonesWithActivityByUser);

  // User handlers
  app.post('/api/users/create', UserHandler.createUser);
  app.post('/api/users/login', UserHandler.login);
  app.delete('/api/users/delete/:userId', UserHandler.deleteUser);
  app.get('/api/users/:userId', UserHandler.getUser);
  app.get('/api/users', UserHandler.getUsers);
  app.post('/api/users/update/:userId', UserHandler.updateUser);

  // Member handlers
  app.post('/api/members/create', MemberHandler.createMember);
  app.delete('/api/members/delete/:memberId', MemberHandler.deleteMember);
  app.get('/api/members/:memberId', MemberHandler.getMember);
  app.get('/api/members', MemberHandler.getMembers);
  app.get('/api/members/users/:userId', MemberHandler.getMembersByUser);

  // Activity handlers
  app.post('/api/activity/create', ActivityHandler.createActivity);
  app.delete('/api/activity/delete/:activityId', ActivityHandler.deleteActivity);
  app.get('/api/activity/:activityId', ActivityHandler.getActivity);
  app.get('/api/activity', ActivityHandler.getActivities);
  app.get('/api/activity/zone/:zoneId', ActivityHandler.getActivitiesByZone);

  // Assembly handlers
  app.post('/api/assembly/create', AssemblyHandler.createPoint);
  app.post('/api/assembly/update/:zoneId', AssemblyHandler.updatePoint);
  app.get('/api/assembly/:zoneId', AssemblyHandler.getPoints);

  // Comment handlers
  app.post('/api/comment/create', CommentHandler.createComment);
  app.delete('/api/comment/delete/:commentId', CommentHandler.deleteComment);
  app.get('/api/comments/members/:memberId', CommentHandler.getCommentsByMember);
  app.get('/api/comment/:commentId', CommentHandler.getComment);

  // Link handlers
  app.post('/api/links/create', LinkHandler.createLink);
  app.delete('/api/links/delete/:linkId', LinkHandler.deleteLink);
  app.get('/api/links/users/:userId', LinkHandler.getLinksByUser);
  app.get('/api/links/members/:memberId', LinkHandler.getLinksByMember);
  app.get('/api/links', LinkHandler.getAllLinks);
  app.get('/api/links/:linkId', LinkHandler.getLink);

  // Notification handlers
  app.post('/api/notifications/create', NotificationHandler.createNotification);
  app.get('/api/notifications/:notificationId', NotificationHandler.getNotification);
  app.get('/api/notifications/users/:userId', NotificationHandler.getNotificationsByUser);
  app.get('/api/notifications/latest/:userId', NotificationHandler.getLatestByUser);
  app.get('/api/notifications/clear/:notificationId', NotificationHandler.clearNotification);

  // Settings handlers
  app.post('/api/settings/update/:userId', SettingHandler.updateSetting);
  app.get('/api/settings/:userId', SettingHandler.getSettingByUser);

  // Misc handlers
  app.get(['/', '/api', '/api/docs'], MiscHandler.getDocumentation);
  app.get('/api/ping', MiscHandler.getPingResponse);
  app.get('/api/danger/purge/:code', MiscHandler.resetDatabase);

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

} main();