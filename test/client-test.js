import { Client } from '../src/index.js'
import { RequestLogger, ResponseLogger } from 'stackable-fetcher'

describe('Client', () => {
  let client = new Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  client.getFetcher()
    .use(RequestLogger)
    .use(ResponseLogger);

  describe('#createResource', () => {
    it('does not raise any error', (done) => {
      client.createResource({
        parentId: 'parentId',
        pathPart: 'pathPart',
        restapiId: 'restapiId'
      }).then((resource) => {
        done();
      });
    });
  });

  describe('#createRestapi', () => {
    it('does not raise any error', (done) => {
      client.createRestapi({
        name: 'name'
      }).then((restapi) => {
        done();
      });
    });
  });

  describe('#deleteModel', () => {
    it('does not raise any error', (done) => {
      client.deleteModel({
        modelName: 'modelName',
        restapiId: 'restapiId'
      }).then(() => {
        done();
      });
    });
  });

  describe('#deleteRestapi', () => {
    it('does not raise any error', (done) => {
      client.deleteRestapi({
        restapiId: 'restapiId'
      }).then(() => {
        done();
      });
    });
  });

  describe('#listResources', function() {
    it('does not raise any error', (done) => {
      client.listResources({
        restapiId: 'restapiId'
      }).catch((error) => {
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

  describe('#putMethod', () => {
    it('does not raise any error', (done) => {
      client.putMethod({
        httpMethod: 'httpMethod',
        resourceId: 'resourceId',
        restapiId: 'restapiId',
      }).then((method) => {
        done();
      });
    });
  });
});
