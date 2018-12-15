const nock = require('nock');

const Client = require('../src/client');
const SequencesHandler = require('../src/sequences');

describe('SequencesHandler', () => {
  describe('list', () => {
    it('should correctly handle unauthenticated requests', async () => {
      nock('https://api.mixmax.com')
        .get('/v1/sequences/')
        .reply(401);

      const sequencesHandler = new SequencesHandler(new Client('foo'));
      await expect(sequencesHandler.list()).rejects.toThrow();
    });
  });
});