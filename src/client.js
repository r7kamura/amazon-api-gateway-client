import AwsSignerV4 from 'stackable-fetcher-aws-signer-v4'
import { Fetcher, JsonRequestEncoder, JsonResponseDecoder, RejectLogger } from 'stackable-fetcher'
import Model from './model'
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
    return this.getFetcher().post(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${parentId}`,
      { pathPart: pathPart }
    ).then(body => new Resource(body));
  }

  /**
   * @param {String} name
   * @return {Promise}
   */
  createRestapi({ name }) {
    return this.getFetcher().post(
      `${this._getBaseUrl()}/restapis`,
      { name: name }
    ).then(body => new Restapi(body));
  }

  /**
   * @param {String} modelName
   * @param {String} restapiId
   * @return {Promise}
   */
  deleteModel({ modelName, restapiId }) {
    return this.getFetcher().delete(
      `${this._getBaseUrl()}/restapis/${restapiId}/models/${modelName}`
    ).then(response => null);
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
    return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources`
    ).then(body => body.item.map(source => new Resource(source)));
  }

  /**
   * @return {Promise}
   */
  listRestapis() {
    return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis`
    ).then(body => body.item.map(source => new Restapi(source)));
  }

  /**
   * @return [Fetcher]
   */
  _buildFetcher() {
    return new Fetcher()
      .use(RejectLogger)
      .use(JsonRequestEncoder)
      .use(
        AwsSignerV4,
        {
          accessKeyId: this.accessKeyId,
          region: this.region,
          secretAccessKey: this.secretAccessKey
        }
      )
      .use(JsonResponseDecoder);
  }

  /**
   * @return {String}
   */
  _getBaseUrl() {
    return `https://apigateway.${this.region}.amazonaws.com`;
  }
}
