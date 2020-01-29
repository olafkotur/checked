import { HttpService } from './HttpService';

export const LiveService = {

    getLiveData: async (type: string, sensorId: number): Promise<any> => {
        const uri = 'live/' + type + '/' + sensorId.toString();
        await HttpService.get(uri).then((res) => {
            return res;
        });
    },

    getLiveTempDataByZone: async (zoneID: number): Promise<any> => {
        const uri = 'live/temperature/' + zoneID.toString();
        return await HttpService.get(uri);
    }
    
};