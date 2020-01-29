import { HttpService } from './HttpService';

export const LocationService = {

    getAllMemberLocationsByUser: async ( userId: number): Promise<any> => {
        const uri = 'location/users/' + userId.toString();
        return await HttpService.get(uri);
            
    },
};