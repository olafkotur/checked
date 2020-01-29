import { HttpService } from './HttpService';

export const LocationService = {

    getAllMemberLocationsByUser: async ( userId: number): Promise<any> => {
        const uri = 'location/users/' + userId.toString();
        await HttpService.get(uri).then((res) => {
            return res;
        });
        return {};
    },
};