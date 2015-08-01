import { Client } from '../src/index.js'

describe('Client', () => {
  describe('#listRestapis', () => {
    let client = new Client({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    it('does not raise any error', (done) => {
      client.listRestapis().then((restapi) => {
        done();
      });
    });
  });
});
