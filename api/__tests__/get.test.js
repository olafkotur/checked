const HttpService = require('../http');

const domain = 'http://localhost:8080'

describe('LiveHandler.getLiveData', () => {
  it('should return live data', async () => {
    const res = await HttpService.get(`${domain}/api/live/temperature`);
    expect(res.code).toEqual(200);
  });
});
