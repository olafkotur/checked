const request = require('request');
const delay = require('delay');

const DEBUG = true;
const domain = DEBUG ? 'http://localhost:8080' : 'http://checked-api.herokuapp.com';

const HelperService = {
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
  },

  random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};

const collections = [
  'temperature',
];

const options = {
  timeout: 5000,
  minSensorId: 1,
  maxSensorId: 5,
  minTemperature: 22,
  maxTemperature: 30,
}

async function main() {
  while (true) {
    
    // Live data
    collections.forEach((col) => {
      const body = {
        type: col,
        value: HelperService.random(options.minTemperature, options.maxTemperature),
        sensorId: HelperService.random(options.minSensorId, options.maxSensorId)
      }
      HelperService.post(domain + '/api/live/upload', body);
    });

    await delay(options.timeout);
  }
} main();