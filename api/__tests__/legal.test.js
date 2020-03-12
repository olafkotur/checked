const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('LegalHandler.getLegalCopy', () => {
  it('should return the legal copy for privacy', async () => {
    const res = await HttpService.get(`${domain}/api/legal/copy/privacy`);
    expect(res.code).toEqual(200);
  });
});

describe('LegalHandler.getLegalCopy', () => {
  it('should return the legal copy for consent', async () => {
    const res = await HttpService.get(`${domain}/api/legal/copy/consent`);
    expect(res.code).toEqual(200);
  });
});

describe('LegalHandler.getLegalCopy', () => {
  it('should return the legal copy for terms and conditions', async () => {
    const res = await HttpService.get(`${domain}/api/legal/copy/conditions`);
    expect(res.code).toEqual(200);
  });
});