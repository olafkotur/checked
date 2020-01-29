import { HttpService } from './HttpService';

export const LiveService = {

    getLiveData: async (type: string, sensorId: number): Promise<any> => {
        const uri = 'live/' + type + '/' + sensorId.toString();
        await HttpService.get(uri).then((res) => {
            return res;
        });
        return {};
    },

    getLiveDataByZone: async (zoneID: number, type: 'temperature'): Promise<any> => {
        const uri = 'live/' + type + '/' + zoneID.toString();
        await HttpService.get(uri).then((res) => {
            return res;
        });
        return {};
    }
    
};