import { HttpService } from './HttpService';

export const UserService = {

    createUser: async (username: string, password: string): Promise<any> => {
        const uri = 'users/create';
        const body = {username, password};
        return await HttpService.post(uri, body);
    },

    login: async (username: string, password: string): Promise<any> => {
        const uri = 'users/login';
        const body = { username, password };
        return await HttpService.post(uri, body);
    },

    getAllUsers: async (): Promise<any> => {
        const uri = 'users';
        return await HttpService.get(uri);
    }

};
