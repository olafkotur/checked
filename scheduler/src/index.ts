import express from 'express';
import schedule from 'node-schedule';
import moment from 'moment';
import { HistoricService } from './services/historic';
import { NotificationService } from './services/notifications';
import { config } from './config';
import { IStatus } from './models';

const DEBUG: boolean = true;
const DOMAIN: string = DEBUG ? 'http://localhost:8080' : 'https://checked-api.herokuapp.com';

const PORT = process.env.PORT || 8081;
const app: express.Application = express();

async function main() {

  // Set to true to disable permanently
  const status: IStatus = {
    isRunningHistoric: true,
    isRunningNotification: false
  };
  
  // Historic Service
  schedule.scheduleJob(config.rules.historic, async () => {
    if (status.isRunningHistoric) {
      return console.log(`Scheduler: a historic service is already running - skipping at ${moment().format('HH:mm:ss')}`);
    }
    console.log(`Scheduler: running historic service at ${moment().format('HH:mm:ss')}`);

    status.isRunningHistoric = true;
    await HistoricService.start(DOMAIN).then(() => status.isRunningHistoric = false);
  });

  // Notification Service
  schedule.scheduleJob(config.rules.notification, async () => {
    if (status.isRunningNotification) {
      return console.log(`Scheduler: a notification service is already running - skipping at ${moment().format('HH:mm:ss')}`);
    }
    console.log(`Scheduler: running notification service at ${moment().format('HH:mm:ss')}`);

    status.isRunningNotification = true;
    await NotificationService.start(DOMAIN).then(() => status.isRunningNotification = false);
  });

  app.listen(PORT, () => console.log(`Scheduler running on port ${PORT}`));

} main();