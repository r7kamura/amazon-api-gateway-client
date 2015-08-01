import AwsSignerV4 from 'stackable-fetcher-aws-signer-v4'
import Fetcher from 'stackable-fetcher'
import Restapi from './restapi'

/**
 * @class Client
 */
 export class Client {
   /**
    * @param {String} accessKeyId
    * @param {String} region
    * @param {String} secretAccessKey
    */
   constructor({ accessKeyId, region, secretAccessKey }) {
     this.accessKeyId = accessKeyId;
     this.region = region;
     this.secretAccessKey = secretAccessKey;
   }

   /**
    * @return {Promise}
    */
   listRestapis() {
     return this._getFetcher().get(`${this._getBaseUrl()}/restapis`)
       .then((response) => {
         return response.json();
       }).then((source) => {
         return source.item.map((element) => {
           return new Restapi(element);
         });
       });
   }

   /**
    * @return {String}
    */
   _getBaseUrl() {
     return `https://apigateway.${this.region}.amazonaws.com`;
   }

   /**
    * @return {Fetcher}
    */
    _getFetcher() {
      if (!this._fetcher) {
        this._fetcher = new Fetcher().use(
          AwsSignerV4,
          {
            accessKeyId: this.accessKeyId,
            region: this.region,
            secretAccessKey: this.secretAccessKey
          }
        );
      }
      return this._fetcher;
    }
 }
