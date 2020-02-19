const request = require('request');

module.exports = {
  get: async (uri) => {
    return await new Promise((resolve, reject) => {
      request.get({ uri }, (error, _response, body) => {
        if (error) {
          console.error(error);
          reject();
        }
        resolve(JSON.parse(body));
      });
    });
  },

  post: async (uri, body) => {
    const options = {
      uri,
      form: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return await new Promise((resolve, reject) => {
      request.post(options, (error, _response, body) => {
        if (error) {
          console.error(error);
          reject();
        }
        try {
          const formatted = JSON.parse(body);
          resolve(formatted);
        } catch(e) {
          resolve({});
        }
      });
    });
  },
};