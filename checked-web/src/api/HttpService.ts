import request from 'request';

const endpoint = 'http://checked-api.herokuapp.com/api/';

export const HttpService = {
    get: (uri: string): Promise<void> => {
        uri = endpoint + uri;
        return new Promise((resolve: any, reject: any) => {
            request.get({ uri }, (error: Error) => {
                if (error) {
                    reject();
                }
                resolve();
            });
        });
    },

    post: async (uri: string, body: any): Promise<void> => {
        uri = endpoint + uri;
        const options = {
            uri,
            form: body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return new Promise((resolve: any, reject: any) => {
            request.post(options, (error: Error) => {
                if (error) {
                    console.error('error:\n', error);
                    reject();
                }
                resolve();
            });
        });
    },

    delete: (uri: string): Promise<void> => {
        uri = endpoint + uri;
        return new Promise((resolve: any, reject: any) => {
            request.delete({ uri }, (error: Error) => {
                if (error) {
                    reject();
                }
                resolve();
            });
        });
    },
};