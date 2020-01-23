import { HttpService } from './HttpService';

export const LiveService = {

    getLiveData: (type: string, sensorId: number): object => {
        const uri = 'live/' + type + '/' + sensorId.toString();
        HttpService.get(uri).then((res) => {
            return res;
        });
        return {};
    }
    
};