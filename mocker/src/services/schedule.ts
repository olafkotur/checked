import schedule from 'node-schedule';
import { HttpService } from '../services/http';
import { config } from '../config';
import { HelperService } from './helper';
import { IApiIds } from '../types';

export const ScheduleService = {
  live: (domain: string, ids: IApiIds) => {
    schedule.scheduleJob(config.rules.live, async () => {
      let body: object = {};

      // Repeat for each live data reading
      config.types.liveData.forEach(async (col: string) => {
        // Repeat for each member
        for (let i = 0; i < config.default.numberOfMembers; i++) {
          body = {
            userId: ids.user,
            type: col,
            value: HelperService.randomInt(config.minValues.temperature, config.maxValues.temperature),
            memberId: ids.member[i]
          }

          console.log(body);
          await HttpService.post(domain + '/api/live/upload', body);
        }
        console.log(`ScheduleLive: Uploaded live ${col} data for each member`);
      });
    });
  },

  location: (domain: string, ids: IApiIds) => {
    schedule.scheduleJob(config.rules.location, async () => {
      let body: object = {};

      // Repeat for each member
      for (let i = 0; i < config.default.numberOfMembers; i++) {
        body = {
          userId: ids.user,
          memberId: ids.member[i],
          zoneId: ids.zone[HelperService.randomInt(0, config.default.numberOfZones)],
          xValue: HelperService.randomInt(config.minValues.coords, config.maxValues.coords),
          yValue: HelperService.randomInt(config.minValues.coords, config.maxValues.coords),
        };

        console.log(body);
        await HttpService.post(domain + '/api/location/upload', body);
      }
      console.log(`ScheduleLive: Uploaded location data for each member`);
    });
  }
}

