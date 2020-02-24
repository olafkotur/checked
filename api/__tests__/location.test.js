const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('LocationHandler.uploadLocationData', () => {
  it('should create new location data', async () => {
    const res = await HttpService.post(`${domain}/api/location/upload`, {
      userId: 1,
      zoneId: 2,
      memberId: 1,
      xValue: 1,
      yValue: 1
    });
    expect(res.code).toEqual(200);
  });
});

describe('LocationHandler.getLocationData', () => {
  it('should return all location data', async () => {
    const res = await HttpService.get(`${domain}/api/location`);
    expect(res.code).toEqual(200);
  });
});

describe('LocationHandler.getSingleLocationData', () => {
  it('should return single location data', async () => {
    const res = await HttpService.get(`${domain}/api/location/1`);
    expect(res.code).toEqual(200);
  });
});

describe('LocationHandler.getLocationDataByUser', () => {
  it('should return all location data by user', async () => {
    const res = await HttpService.get(`${domain}/api/location/users/1`);
    expect(res.code).toEqual(200);
  });
});