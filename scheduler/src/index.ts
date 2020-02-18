import express from 'express';
import schedule from 'node-schedule';
import { HistoricService } from './services/historic';
import { config } from './config';
import { IStatus } from './models';

const DEBUG: boolean = true;
const DOMAIN: string = DEBUG ? 'http://localhost:8080' : 'https://checked-api.herokuapp.com';

const PORT = process.env.PORT || 8081;
const app: express.Application = express();

async function main() {

  const status: IStatus = {
    isRunningHistoric: false,
  };
  
  // Historic data
  schedule.scheduleJob(config.rules.historic, async () => {
    if (status.isRunningHistoric) {
      return console.log('Scheduler: a historic service is already running - skipping');
    }

    console.log('Scheduler: running temperature service');

    status.isRunningHistoric = true;
    await HistoricService.start(DOMAIN);

    status.isRunningHistoric = false;
  });

  app.listen(PORT, () => console.log(`Scheduler running on port ${PORT}`));

} main();