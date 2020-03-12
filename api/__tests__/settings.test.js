const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('SettingHandler.getSettingByUser', () => {
  it('should return setting data by user', async () => {
    const res = await HttpService.get(`${domain}/api/settings/1`);
    expect(res.code).toEqual(200);
  });
});
