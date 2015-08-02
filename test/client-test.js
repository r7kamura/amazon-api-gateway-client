import { Client } from '../src/index.js'
import { Mock } from 'stackable-fetcher'

describe('Client', () => {
  const client = new Client({
    accessKeyId: 'accessKeyId',
    region: 'region',
    secretAccessKey: 'secretAccessKey',
  });

  describe('#createResource', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).createResource({
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
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).createRestapi({
        name: 'name'
      }).then((restapi) => {
        done();
      });
    });
  });

  describe('#deleteModel', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).deleteModel({
        modelName: 'modelName',
        restapiId: 'restapiId'
      }).then(() => {
        done();
      });
    });
  });

  describe('#deleteRestapi', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).deleteRestapi({
        restapiId: 'restapiId'
      }).then(() => {
        done();
      });
    });
  });

  describe('#getRootResource', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({ item: [] }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).getRootResource({
        restapiId: 'restapiId'
      }).then(() => {
        done();
      });
    });
  });

  describe('#listResources', function() {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({ item: [] }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).listResources({
        restapiId: 'restapiId'
      }).then((error) => {
        done();
      });
    });
  });

  describe('#listRestapis', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({ item: [] }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).listRestapis().then((restapis) => {
        done();
      });
    });
  });

  describe('#putMethod', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).putMethod({
        httpMethod: 'httpMethod',
        resourceId: 'resourceId',
        restapiId: 'restapiId',
      }).then((method) => {
        done();
      });
    });
  });
});
