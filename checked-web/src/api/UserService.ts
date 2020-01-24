import { HttpService } from './HttpService';

export const UserService = {

    createUser: async (username: string, password: string): Promise<any> => {
        const uri = 'users/create';
        const body = encodeURIComponent( ('username=' + username + '&password=' + password) );
        return await HttpService.post(uri, body);
    },

    getAllUsers: async (): Promise<any> => {
        const uri = 'users';
        return await HttpService.get(uri);
    }

};
