import { HttpService } from './HttpService';

export const AssemblyService = {

    async callAssemblyFromZone(zoneID: number): Promise<any> {
        const body = {zoneID};
        return await HttpService.post('assembly/create', body);
    },

    async stopAssemblyCallFromZone(zoneID: number): Promise<any> {
        const body = {isActive: false};
        return await HttpService.post('assembly/update/' + zoneID, body);
    }
};
