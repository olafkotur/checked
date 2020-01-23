import { HttpService } from './HttpService';

export const UserService = {

    createUser: async (username: string, password: string): Promise<object> => {
        const uri = 'users/create';
        const body = encodeURIComponent( 'username=' + username + '&password=' + password );
        await HttpService.post(uri, body).then((res) => {
            console.log('res', res);
            return res;
        });
        return { error: 1 };
    },

    getAllUsers: (): Array<object> => {
        const uri = 'users';
        HttpService.get(uri).then((res => {
            return res;
        }));
        return [];
    }

};
