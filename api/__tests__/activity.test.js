const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('ActivityHandler.getActivity', () => {
  it('should return activity data', async () => {
    const res = await HttpService.get(`${domain}/api/activity/1`);
    expect(res.code).toEqual(200);
  });
});

describe('ActivityHandler.getActivities', () => {
  it('should return all activity data', async () => {
    const res = await HttpService.get(`${domain}/api/activity`);
    expect(res.code).toEqual(200);
  });
});

describe('ActivityHandler.getActivitiesByZone', () => {
  it('should return activity data by zone', async () => {
    const res = await HttpService.get(`${domain}/api/activity/zone/1`);
    expect(res.code).toEqual(200);
  });
});