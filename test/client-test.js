import { Client } from '../src/index.js'
import { Mock } from 'stackable-fetcher'

describe('Client', () => {
  const client = new Client({
    accessKeyId: 'accessKeyId',
    region: 'region',
    secretAccessKey: 'secretAccessKey',
  });

  describe('#createDeployment', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).createDeployment({
        restapiId: 'restapiId',
        stageName: 'production'
      }).then((resource) => {
        done();
      }).catch(err => done(err));
    });
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
      }).catch(err => done(err));
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
      }).catch(err => done(err));
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
      }).catch(err => done(err));
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
      }).catch(err => done(err));
    });
  });

  describe('#getMethod', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).getMethod({
        httpMethod: 'GET',
        resourceId: 'resourceId',
        restapiId: 'restapiId'
      }).then(() => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('#getRestapi', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).getRestapi({
        restapiId: 'restapiId'
      }).then(() => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('#getRootResource', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({ _embedded: { item: [] } }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).getRootResource({
        restapiId: 'restapiId'
      }).then(() => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('#listResources', function() {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({ _embedded: { item: [] } }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).listResources({
        restapiId: 'restapiId'
      }).then((error) => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('#listRestapis', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({ _embedded: { item: [] } }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).listRestapis().then((restapis) => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('#putIntegration', () => {
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
        httpMethod: 'GET',
        integrationHttpMethod: 'GET',
        resourceId: 'resourceId',
        restapiId: 'restapiId',
        type: 'HTTP',
        url: 'http://example.com'
      }).then((method) => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('#putIntegrationResponse', () => {
    it('does not raise any error', (done) => {
      client.use(
        Mock,
        {
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).putIntegrationResponse({
        httpMethod: 'GET',
        resourceId: 'resourceId',
        restapiId: 'restapiId',
        statusCode: 200
      }).then((method) => {
        done();
      }).catch(err => done(err));
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
        httpMethod: 'GET',
        resourceId: 'resourceId',
        restapiId: 'restapiId'
      }).then((method) => {
        done();
      }).catch(err => done(err));
    });
  });

  describe('#putMethodResponse', () => {
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
        httpMethod: 'GET',
        resourceId: 'resourceId',
        restapiId: 'restapiId',
        statusCode: 200
      }).then((method) => {
        done();
      }).catch(err => done(err));
    });
  });
});
