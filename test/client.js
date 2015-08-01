import { Client } from '../src/index.js'
import { ResponseLogger } from 'stackable-fetcher'

describe('Client', () => {
  let client = new Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  client.getFetcher().use(ResponseLogger);

  describe('#createRestapi', () => {
    it('does not raise any error', (done) => {
      client.createRestapi({ name: 'a' }).then((restapis) => {
        done();
      });
    });
  });

  describe('#listRestapis', () => {
    it('does not raise any error', (done) => {
      client.listRestapis().then((restapis) => {
        done();
      });
    });
  });
});
