const HttpService = require('../http');
const domain = 'http://localhost:8080';

describe('FeedbackHandler.getFeedback', () => {
  it('should return feedback data', async () => {
    const res = await HttpService.get(`${domain}/api/feedback/1`);
    expect(res.code).toEqual(200);
  });
});

describe('FeedbackHandler.getFeedbackByUser', () => {
  it('should return feedback data by user', async () => {
    const res = await HttpService.get(`${domain}/api/feedback/users/1`);
    expect(res.code).toEqual(200);
  });
});

describe('FeedbackHandler.getFeedbackByMember', () => {
  it('should return feedback data by member', async () => {
    const res = await HttpService.get(`${domain}/api/feedback/members/1`);
    expect(res.code).toEqual(200);
  });
});



