import express from 'express';
import schedule from 'node-schedule';
import { config } from './config';
import { IState } from './models';

const PORT = process.env.PORT || 8080;
const app: express.Application = express();

async function main() {

  const state: IState = {
    isRunningTemperature: false,
    isRunningLocation: false
  };
  
  // Temperature Service
  schedule.scheduleJob(config.temperatureServiceRule, async () => {
    if (state.isRunningTemperature) {
      return console.log('Scheduler: a temperature service is already running - skipping');
    }

    state.isRunningTemperature = true;
    console.log('Scheduler: running temperature service');
    state.isRunningTemperature = false;
  });

  // Location Service
  schedule.scheduleJob(config.locationServiceRule, async () => {
    if (state.isRunningLocation) {
      return console.log('Scheduler: a location service is already running - skipping');
    }

    state.isRunningLocation = true;
    console.log('Scheduler: running location service');
    state.isRunningLocation = false;
  });

  app.listen(PORT, () => console.log(`Scheduler running on port ${PORT}`));

} main();