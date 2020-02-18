import { HttpService } from './http';
import { IHistoricResponse, ILiveResponse, IActivityResponse } from '../models';

/* TODO:
  1. Get the latest data
  2. Calculate the average temperature
  3. Get the number of active members
  4. Count all the active zones
  5. Count the number of active activities
  6. Count how many users there are in each zone
  7. Show which users are in which zone
*/

export const HistoricService = {

  start: async (domain: string): Promise<void> => {
    const liveData: any = await HistoricService.getLatestData(domain);
    const uniqueUsers = HistoricService.getUniqueValues('userId', liveData.result);

    uniqueUsers.forEach(async (userId: number) => {
      const userData: ILiveResponse[] = liveData.result.filter((live: ILiveResponse) => live.userId === userId);
      const data: IHistoricResponse = {
        userId,
        averageTemperature: HistoricService.calcAverageTemperature(userData),
        membersActive: HistoricService.calcMembersActive(userData),
        zonesCount: HistoricService.calcActiveZones(userData),
        activitiesCount: await HistoricService.calcActivities(userData, domain)
      };
      console.log(data);
    });

    // await HistoricService.uploadData(domain, formatted);
  },

  getLatestData: async (domain: string): Promise<any> => {
    const data: any = await HttpService.get(domain + '/api/live/temperature');
    return data;
  },

  getUniqueValues: (type: string, data: ILiveResponse[]): number[] => {
    const uniques: number[] = [];
    data.forEach((live: any) => {
      if (!uniques.includes(live[type])) {
        uniques.push(live[type]);
      }
    });
    return uniques;
  },

  calcAverageTemperature: (data: ILiveResponse[]): number => {
    let sum = 0;
    data.forEach((live: ILiveResponse) => sum += live.value);
    return sum / data.length;
  },

  calcMembersActive: (data: ILiveResponse[]): number => {
    return HistoricService.getUniqueValues('memberId', data).length;
  },

  calcActiveZones: (data: ILiveResponse[]): number => {
    return HistoricService.getUniqueValues('zoneId', data).length;
  },

  calcActivities: async (data: ILiveResponse[], domain: string): Promise<number> => {
    const zones: number[] = HistoricService.getUniqueValues('zoneId', data);
    const activities: any = await HttpService.get(domain + '/api/activity');
    const valid: IActivityResponse[] = [];
    activities.result.forEach((activity: IActivityResponse) => {
      if (zones.includes(activity.zoneId)) {
        valid.push(activity);
      }
    })
    return valid.length;
  },

  uploadData: async (domain: string, data: any): Promise<boolean> => {
    console.log(data);
    console.log('HistoricService: uploaded historic data to the database');
    return false;
    const res: any = HttpService.post(domain + '/api/historic/upload', data);
    return res.status === 200;
  },
}