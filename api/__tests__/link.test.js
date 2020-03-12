const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('LinkHandler.getLinksByUser', () => {
  it('should return link data by user', async () => {
    const res = await HttpService.get(`${domain}/api/links/users/1`);
    expect(res.code).toEqual(200);
  });
});

describe('LinkHandler.getLinksByMember', () => {
  it('should return link data by member', async () => {
    const res = await HttpService.get(`${domain}/api/links/members/1`);
    expect(res.code).toEqual(200);
  });
});

describe('LinkHandler.getAllLinks', () => {
  it('should return all links', async () => {
    const res = await HttpService.get(`${domain}/api/links`);
    expect(res.code).toEqual(200);
  });
});

describe('LinkHandler.getLink', () => {
  it('should return signle link', async () => {
    const res = await HttpService.get(`${domain}/api/links/1`);
    expect(res.code).toEqual(200);
  });
});
