const request = require('request');

const DEBUG = true;
const domain = DEBUG ? 'http://localhost:8080' : 'http://checked-api.herokuapp.com';

const HttpService = {
  get: (uri) => {
    return request.get({ uri }, (error, response) => {
      if (error) {
        console.error(error);
        return false;
      }

      console.log(response.body);
    });
  },

  post: (uri, body) => {
    const options = {
      uri,
      form: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return request.post(options, (error, response) => {
      if (error) {
        console.error(error);
        return false;
      }

      console.log(response.body);
    });
  }
};

function main() {
  // HttpService.get(domain + '/api/ping');
  HttpService.post(domain + '/api/live/upload', { type: 'temperature', value: 150, sensorId: 1} );
} main();