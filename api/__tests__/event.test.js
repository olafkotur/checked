const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('EventHandler.getEvent', () => {
  it('should return event data', async () => {
    const res = await HttpService.get(`${domain}/api/events/1`);
    expect(res.code).toEqual(200);
  });
});

describe('EventHandler.getEventByUser', () => {
  it('should return event data by user', async () => {
    const res = await HttpService.get(`${domain}/api/events/users/1`);
    expect(res.code).toEqual(200);
  });
});
