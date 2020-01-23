import schedule from 'node-schedule';
import { config } from '../config';

export const ScheduleService = {
  live: () => {
    schedule.scheduleJob(config.rules.live, async () => {
      console.log('Live scheduler');
    });
  },

  location: () => {
    schedule.scheduleJob(config.rules.location, async () => {
      console.log('Location scheduler');
    });
  }
}

