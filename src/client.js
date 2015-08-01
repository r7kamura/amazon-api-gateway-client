import AwsSignerV4 from 'stackable-fetcher-aws-signer-v4'
import { Fetcher } from 'stackable-fetcher'
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
    * @return {Fetcher}
    */
    getFetcher() {
      if (!this._fetcher) {
        this._fetcher = this._buildFetcher();
      }
      return this._fetcher;
    }

   /**
    * @return {Promise}
    */
   listRestapis() {
     return this.getFetcher().get(`${this._getBaseUrl()}/restapis`)
       .then((response) => {
         return response.json();
       }).then((source) => {
         return source.item.map((element) => {
           return new Restapi(element);
         });
       });
   }

   /**
    * @return [Fetcher]
    */
   _buildFetcher() {
     return new Fetcher().use(
       AwsSignerV4,
       {
         accessKeyId: this.accessKeyId,
         region: this.region,
         secretAccessKey: this.secretAccessKey
       }
     );
   }

   /**
    * @return {String}
    */
   _getBaseUrl() {
     return `https://apigateway.${this.region}.amazonaws.com`;
   }
 }
