const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('HistoricHandler.uploadHistoricalData', () => {
  it('should create new historical data', async () => {
    const res = await HttpService.post(`${domain}/api/historic/upload`, {
      userId: 1,
      averageTemperature: 28,
      membersActive: 8,
      zonesCount: 2,
      activitiesCount: 1,
      locations: [],
      temperatures: []
    });
    expect(res.code).toEqual(200);
  });
});

describe('HistoricHandler.getHistoricByUser', () => {
  it('should return historic data by user', async () => {
    const res = await HttpService.get(`${domain}/api/historic/1`);
    expect(res.code).toEqual(200);
  });
});