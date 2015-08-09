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

## Development
```
npm install
npm run
```
