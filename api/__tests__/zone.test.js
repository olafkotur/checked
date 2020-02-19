const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('ZoneHandler.createZone', () => {
  it('should create new zone', async () => {
    const res = await HttpService.post(`${domain}/api/zones/create`, {
      userId: 1,
      name: 'Test',
      width: 1,
      height: 1,
      xValue: 10,
      yValue: 10,
      color: 'rgb(255, 158, 0)'
    });
    expect(res.code).toEqual(201);
  });
});

describe('ZoneHandler.updateZone', () => {
  it('should update existing zone', async () => {
    const res = await HttpService.post(`${domain}/api/zones/update/1`, {
      userId: 1,
      name: 'Updated Test',
      width: 1,
      height: 1,
      xValue: 10,
      yValue: 10,
      color: 'rgb(255, 158, 0)'
    });
    expect(res.code).toEqual(200);
  });
});

describe('ZoneHandler.getZoneData', () => {
  it('should return all zones', async () => {
    const res = await HttpService.get(`${domain}/api/zones`);
    expect(res.code).toEqual(200);
  });
});

describe('ZoneHandler.getSingleZoneData', () => {
  it('should return single zone', async () => {
    const res = await HttpService.get(`${domain}/api/zones/1`);
    expect(res.code).toEqual(200);
  });
});

describe('ZoneHandler.getZonesByUser', () => {
  it('should return all zones by user', async () => {
    const res = await HttpService.get(`${domain}/api/zones/users/1`);
    expect(res.code).toEqual(200);
  });
});

describe('ZoneHandler.getZonesWithActivityByUser', () => {
  it('should return all zones with their activites by the user', async () => {
    const res = await HttpService.get(`${domain}/api/zones/activity/users/1`);
    expect(res.code).toEqual(200);
  });
});