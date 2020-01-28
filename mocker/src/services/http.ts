const request = require('request');

export const HttpService = {
  get: async (uri: string): Promise<void> => {
    return await new Promise((resolve: any, reject: any) => {
      request.get({ uri }, (error: Error, _response: any, body: any) => {
        if (error) {
          console.error(error);
          reject();
        }
        resolve(JSON.parse(body));
      });
    });
  },

  post: async (uri: string, body: any): Promise<void> => {
    const options = {
      uri,
      form: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return await new Promise((resolve: any, reject: any) => {
      request.post(options, (error: Error, _response: any, body: any) => {
        if (error) {
          console.error(error);
          reject();
        }
        resolve(JSON.parse(body));
      });
    });
  },
};