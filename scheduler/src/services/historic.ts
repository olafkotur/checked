import delay from 'delay';
import { HttpService } from './http';
import { IHistoricResponse, ILiveResponse, IActivityResponse, ILocations, ILocationResponse, IZoneTemperatures } from '../models';

export const HistoricService = {

  start: async (domain: string): Promise<void> => {
    const liveData: any = await HistoricService.getLatestData(domain);
    const uniqueUsers = HistoricService.getUniqueValues('userId', liveData.result);

    // Repeat the historic data process for each unique user in the database
    uniqueUsers.forEach(async (userId: number) => {
      const userData: ILiveResponse[] = liveData.result.filter((live: ILiveResponse) => live.userId === userId);
      const data: IHistoricResponse = {
        userId,
        averageTemperature: HistoricService.calcAverageTemperature(userData),
        membersActive: HistoricService.calcMembersActive(userData),
        zonesCount: HistoricService.calcActiveZones(userData),
        activitiesCount: await HistoricService.calcActivities(userData, domain),
        locations: JSON.stringify(await HistoricService.getLocationData(userData, userId, domain)),
        temperatures: JSON.stringify(await HistoricService.getZoneTemperatures(userData))
      };
      delay(250); // Safety to not overload server
      await HistoricService.uploadData(domain, data);
    });
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
    
    // Find all the active activities in the database
    activities.result.forEach((activity: IActivityResponse) => {
      if (zones.includes(activity.zoneId)) {
        valid.push(activity);
      }
    })
    return valid.length;
  },

  getLocationData: async (data: ILiveResponse[], userId: number, domain: string): Promise<ILocations[]> => {
    const locations: any = await HttpService.get(`${domain}/api/location/users/${userId}`);
    const zoneIds: number[] = HistoricService.getUniqueValues('zoneId', data);
    const formatted: ILocations[] = [];

    // Find where each member is and store it
    zoneIds.forEach((zoneId: number) => {
      const members: number[] = [];
      locations.result.forEach((location: ILocationResponse) => {
        if (location.zoneId === zoneId) {
          members.push(location.memberId);
        }
      });
      formatted.push({ zoneId, members});
    });
    return formatted;
  },

  getZoneTemperatures: async (data: ILiveResponse[]): Promise<IZoneTemperatures[]> => {
    const temperatures: IZoneTemperatures[] = [];
    
    // This is hacky as shit but there's 20 hours left lol
    data.forEach((live: ILiveResponse) => {
      const exists = temperatures.find((temp: IZoneTemperatures) => temp.zoneId === live.zoneId);
      if (!exists) {
        temperatures.push({ zoneId: live.zoneId, value: live.value});
      }
    });
    return temperatures;
  },

  uploadData: async (domain: string, data: any): Promise<boolean> => {
    const res: any = await HttpService.post(domain + '/api/historic/upload', data);
    if (res.code === 200) {
      console.log('HistoricService: uploaded historic data to the database');
    } else {
      console.log('HistoricService: failed to upload historic data to the database');
    }
    return res.code === 200;
  },
}