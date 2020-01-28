import { HttpService } from './HttpService';

export const UserService = {

    createUser: async (email: string, password: string): Promise<any> => {
        const uri = 'users/create';
        const body = {email, password};
        return await HttpService.post(uri, body);
    },

    login: async (email: string, password: string): Promise<any> => {
        const uri = 'users/login';
        const body = { email, password };
        return await HttpService.post(uri, body);
    },

    getAllUsers: async (): Promise<any> => {
        const uri = 'users';
        return await HttpService.get(uri);
    }

};
