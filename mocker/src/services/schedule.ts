import schedule from 'node-schedule';
import { HttpService } from '../services/http';
import { config } from '../config';
import { HelperService } from './helper';

export const ScheduleService = {
  live: (domain: string) => {
    schedule.scheduleJob(config.rules.live, async () => {
      let body: object = {};

      // Repeat for each live data reading
      config.types.liveData.forEach(async (col: string) => {
        // Repeat for each member
        for (let i = 0; i < config.default.numberOfMembers; i++) {
          body = {
            type: col,
            value: HelperService.randomInt(config.minValues.temperature, config.maxValues.temperature),
            sensorId: i + 1,
          }

          await HttpService.post(domain + '/api/live/upload', body);
        }
      });
    });
  },

  location: (domain: string) => {
    schedule.scheduleJob(config.rules.location, async () => {
      let body: object = {};

      // Repeat for each member
      for (let i = 0; i < config.default.numberOfMembers; i++) {
        body = {
          sensorId: i + 1,
          xValue: HelperService.randomInt(config.minValues.coords, config.maxValues.coords),
          yValue: HelperService.randomInt(config.minValues.coords, config.maxValues.coords),
        }

        await HttpService.post(domain + '/api/location/upload', body);
      }
    });
  }
}

