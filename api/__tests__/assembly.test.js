const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('AssemblyHandler.getPoints', () => {
  it('should return assembly point data', async () => {
    const res = await HttpService.get(`${domain}/api/assembly/1`);
    expect(res.code).toEqual(200);
  });
});
