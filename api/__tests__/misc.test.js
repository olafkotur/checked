const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('MiscHandler.getPingResponse', () => {
  it('should return link data by user', async () => {
    const res = await HttpService.get(`${domain}/api/ping`);
    expect(res.code).toEqual(200);
  });
});

