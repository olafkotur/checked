const request = require('request');

export const HttpService = {
  get: (uri: string) => {
    return request.get({ uri }, (error: Error) => {
      if (error) {
        console.error(error);
        return false;
      }
      console.log(`HttpService: Get request made to: ${uri}`);
      return true;
    });
  },

  post: (uri: string, body: any) => {
    const options = {
      uri,
      form: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return request.post(options, (error: Error) => {
      if (error) {
        console.error(error);
        return false;
      }
      console.log(`HttpService: Post request made to: ${uri}`);
      return true;
    });
  },
};