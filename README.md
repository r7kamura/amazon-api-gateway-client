# amazon-api-gateway-client
A client library for Amazon API Gateway.

## Usage
```js
var Client = require('amazon-api-gateway-client').Client;

var client = new Client({
  accessKeyId: '...',
  region: '...',
  secretAccessKey: '...'
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
