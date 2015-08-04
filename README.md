# amazon-api-gateway-client
A client library for Amazon API Gateway.

## Install
```
npm install amazon-api-gateway-client
```

## Usage
```js
var Client = require('amazon-api-gateway-client').Client;

var client = new Client({
  accessKeyId: '...',
  region: '...',
  secretAccessKey: '...'
});

client.createRestapi({ name: 'MyRestapi' }).then(function (restapi) {
  // ...
});

client.listRestapis().then(function (restapis) {
  // ...
});
```

## API
- `new Client({ accessKeyId, region, secretAccessKey })`
- `createDeployment({ cacheClusterEnabled, cacheClusterSize, description, restapiId, stageDescription, stageName }) -> Promise`
- `client.createResources({ paths, restapiId, }) -> Promise`
- `client.createRestapi({ name }) -> Promise`
- `client.deleteModel({ modelName, restapiId }) -> Promise`
- `deleteRestapi({ restapiId }) -> Promise`
- `findResourceByPath({ path, restapiId }) -> Promise`
- `client.listResources({ restapiId }) -> Promise`
- `client.listRestapis() -> Promise`
- `putIntegration({ cacheKeyParameters, cacheNamespace, credentials, httpMethod, integrationHttpMethod, requestParameters,requestTemplates, resourceId, restapiId, type, uri }) -> Promise`
- `putIntegrationResponse({ httpMethod, resourceId, responseParameters, responseTemplates, restapiId, selectionPattern, statusCode }) -> Promise`
- `putMethod({ apiKeyRequired, authorizationType, httpMethod, requestModels, requestParameters, resourceId, restapiId }) -> Promise`
- `putMethodResponse({ httpMethod, resourceId, responseModels, responseParameters, restapiId, statusCode }) -> Promise`
- `use(middleware, options) -> Client`

## Development
```
npm install
npm run
```
