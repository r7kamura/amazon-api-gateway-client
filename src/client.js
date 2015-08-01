import AwsSignerV4 from 'stackable-fetcher-aws-signer-v4'
import { Fetcher, JsonRequestEncoder } from 'stackable-fetcher'
import Resource from './resource'
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
   * @param {String} parentId
   * @param {String} pathPart
   * @param {String} restapiId
   * @return {Promise}
   */
  createResource({ parentId, pathPart, restapiId }) {
    return this.getFetcher()
      .post(
        `${this._getBaseUrl()}/restapis/${restapiId}/resources/${parentId}`,
        { pathPart: pathPart }
      ).then((response) => {
        return response.json();
      }).then((body) => {
        return new Resource(body);
      });
  }

  /**
   * @param {String} name
   * @return {Promise}
   */
  createRestapi({ name }) {
    return this.getFetcher().post(`${this._getBaseUrl()}/restapis`, { name: name })
      .then((response) => {
        return response.json();
      }).then((body) => {
        return new Restapi(body);
      });
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
   * @param {restapiId}
   * @return {Promise}
   */
  listResources({ restapiId }) {
    return this.getFetcher().get(`${this._getBaseUrl()}/restapis/${restapiId}/resources`)
      .then((response) => {
        return response.json();
      }).then((body) => {
        return body.item.map((source) => {
          return new Resource(source);
        });
      });
  }

  /**
   * @return {Promise}
   */
  listRestapis() {
    return this.getFetcher().get(`${this._getBaseUrl()}/restapis`)
      .then((response) => {
        return response.json();
      }).then((body) => {
        return body.item.map((source) => {
          return new Restapi(source);
        });
      });
  }

  /**
   * @return [Fetcher]
   */
  _buildFetcher() {
    return new Fetcher()
      .use(JsonRequestEncoder)
      .use(
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
