import request from 'request';

const endpoint = 'http://checked-api.herokuapp.com/api/';

export const HttpService = {
    get: (uri: string): Promise<any> => {
        uri = endpoint + uri;
        return new Promise((resolve: any, reject: any) => {
            request.get({ uri }, (error: Error, _res: any, body: any) => {
                if (error) {
                    reject();
                }
                try {
                    const formatted = JSON.parse(body);
                    resolve(formatted);
                } catch (e) {
                    resolve({});
                }                           
            });
        });
    },

    post: async (uri: string, body: any): Promise<any> => {
        uri = endpoint + uri;
        const options = {
            uri,
            form: body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return new Promise((resolve: any, reject: any) => {
            request.post(options, (error: Error, _res: any, body: any) => {
                if (error) {
                    reject();
                }
                try {
                    const formatted = JSON.parse(body);
                    resolve(formatted);
                } catch (e) {
                    resolve({});
                }
            });
        });
    },

    delete: (uri: string): Promise<any> => {
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

    // getEndpoint: (): string => (endpoint)
};