const request = require('request');

export const HttpService = {
  get: async (uri: string): Promise<any> => {
    return await new Promise((resolve: any, reject: any) => {
      request.get({ uri }, (error: Error, _response: any, body: any) => {
        if (error) {
          console.error(error);
          reject();
        }
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve({});
        }
      });
    });
  },

  post: async (uri: string, body: any): Promise<any> => {
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
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve({});
        }
      });
    });
  },
};