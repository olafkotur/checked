const request = require('request');

export const HttpService = {
  get: (uri: string): Promise<void> => {
    return new Promise((resolve: any, reject: any) => {
      request.get({ uri }, (error: Error) => {
        if (error) {
          console.error(error);
          reject();
        }
        console.log(`HttpService: Get request made to: ${uri}`);
        resolve();
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

    return new Promise((resolve: any, reject: any) => {
      request.post(options, (error: Error) => {
        if (error) {
          console.error(error);
          reject();
        }
        console.log(`HttpService: Post request made to: ${uri}`);
        resolve();
      });
    });
  },
};