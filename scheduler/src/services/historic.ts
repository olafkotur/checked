import { HttpService } from './http';
import { IHistoricResponse } from '../models';

export const HistoricService = {

  start: async (domain: string): Promise<void> => {
    const latestData: any = await HistoricService.getLatestData(domain);
    const formatted: IHistoricResponse = HistoricService.formatData(latestData);
    await HistoricService.uploadData(domain, formatted);
  },

  getLatestData: async (domain: string): Promise<any> => {
    const data: any = await HttpService.get(domain + '/api/live/temperature');
    return data;
  },

  formatData: (_data: any): IHistoricResponse => {
    return {
      userId: 1,
      averageTemperature: 1,
      membersActive: 1,
      zonesCount: 1,
      activitiesCount: 1,
      createdAt: 1,
    };
  },

  uploadData: async (domain: string, data: any): Promise<boolean> => {
    console.log(data);
    console.log('HistoricService: uploaded historic data to the database');
    return false;
    const res: any = HttpService.post(domain + '/api/historic/upload', data);
    return res.status === 200;
  },
}