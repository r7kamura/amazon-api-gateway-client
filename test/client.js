import { Client } from '../index.js'

describe('Client', () => {
  describe('#listRestapis', () => {
    let client = new Client({
      accessKeyId: 'accessKeyId',
      region: 'ua-east-1',
      secretAccessKey: 'secretAccessKey',
    });

    it('does not raise any error', () => {
      client.listRestapis();
    });
  });
});
