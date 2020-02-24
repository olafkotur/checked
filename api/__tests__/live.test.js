const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('LiveHandler.uploadLiveData', () => {
  it('should create new live data', async () => {
    const res = await HttpService.post(`${domain}/api/live/upload`, {
      userId: 1,
      memberId: 1,
      type: 'temperature',
      value: 26,
    });
    expect(res.code).toEqual(200);
  });
});

describe('LiveHandler.getLiveData', () => {
  it('should return live data', async () => {
    const res = await HttpService.get(`${domain}/api/live/temperature`);
    expect(res.code).toEqual(200);
  });
});

describe('LiveHandler.getLiveDataByMember', () => {
  it('should return live data by member', async () => {
    const res = await HttpService.get(`${domain}/api/live/temperature/1`);
    expect(res.code).toEqual(200);
  });
});

describe('LiveHandler.getLiveDataByZone', () => {
  it('should return live data by zone', async () => {
    const res = await HttpService.get(`${domain}/api/live/temperature/zones/1`);
    expect(res.code).toEqual(200);
  });
});
