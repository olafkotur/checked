const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('MemberHandler.getMember', () => {
  it('should return single member data', async () => {
    const res = await HttpService.get(`${domain}/api/members/1`);
    expect(res.code).toEqual(200);
  });
});

describe('MemberHandler.getMembers', () => {
  it('should return members data', async () => {
    const res = await HttpService.get(`${domain}/api/members`);
    expect(res.code).toEqual(200);
  });
});

describe('MemberHandler.getMembersByUser', () => {
  it('should return members data by user', async () => {
    const res = await HttpService.get(`${domain}/api/members/users/1`);
    expect(res.code).toEqual(200);
  });
});