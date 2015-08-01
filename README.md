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

client.createRestapi({ name: 'MyRestapi' }).then(function (restapis) {
  // ...
});

client.listRestapis().then(function (restapis) {
  // ...
});
```

## API
- `new Client({ accessKeyId, region, secretAccessKey })`
- `client.createResources({ parentId, pathPart, restapiId, }) -> Promise`
- `client.createRestapi({ name }) -> Promise`
- `client.deleteModel({ modelName, restapiId }) -> Promise`
- `client.listResources({ restapiId }) -> Promise`
- `client.listRestapis() -> Promise`

## Development
```
npm install
npm run
```
