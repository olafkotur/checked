const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('UserHandler.getUser', () => {
  it('should return single user data', async () => {
    const res = await HttpService.get(`${domain}/api/users/1`);
    expect(res.code).toEqual(200);
  });
});

describe('UserHandler.getUsers', () => {
  it('should return user data', async () => {
    const res = await HttpService.get(`${domain}/api/users`);
    expect(res.code).toEqual(200);
  });
});