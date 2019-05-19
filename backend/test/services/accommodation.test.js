const app = require('../../src/app');

describe('\'accommodation\' service', () => {
  it('registered the service', () => {
    const service = app.service('accommodation');
    expect(service).toBeTruthy();
  });
});
