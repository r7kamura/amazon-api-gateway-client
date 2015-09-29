import AwsSignerV4 from 'stackable-fetcher-aws-signer-v4'
import { Fetcher, JsonRequestEncoder, JsonResponseDecoder, RejectLogger } from 'stackable-fetcher'
import Deployment from './deployment'
import Integration from './integration'
import IntegrationResponse from './integration-response'
import Method from './method'
import MethodResponse from './method-response'
import Model from './model'
import path from 'path'
import Resource from './resource'
import Restapi from './restapi'

/**
 * @class Client
 */
export default class Client {
  /**
   * @param {String} accessKeyId
   * @param {Fetcher} fetcher
   * @param {String} region
   * @param {String} secretAccessKey
   */
  constructor({ accessKeyId, fetcher, region, secretAccessKey }) {
    this.accessKeyId = accessKeyId;
    this._fetcher = fetcher;
    this.region = region;
    this.secretAccessKey = secretAccessKey;
  }

  /**
   * @param {Boolean=} cacheClusterEnabled
   * @param {Integer=} cacheClusterSize
   * @param {String=} description
   * @param {String} restapiId
   * @param {String} stageDescription
   * @param {String} stageName
   * @return {Promise}
   */
  createDeployment({ cacheClusterEnabled, cacheClusterSize, description, restapiId, stageDescription, stageName }) {
    return this.getFetcher().post(
      `${this._getBaseUrl()}/restapis/${restapiId}/deployments`,
      {
        cacheClusterEnabled: cacheClusterEnabled,
        cacheClusterSize: cacheClusterSize,
        description: description,
        stageDescription: stageDescription,
        stageName: stageName
      }
    ).then(body => new Deployment(body));
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
   * @param {Array.<String>} paths
   * @param {String} restapiId
   * @return {Promise}
   */
  createResources({ paths, restapiId }) {
    return this.getRootResource({ restapiId: restapiId }).then((rootResource) => {
      return this._createResourcesByPaths({
        paths: paths,
        restapiId: restapiId,
        rootResource: rootResource
      });
    });
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
   * @param {String} restapiId
   * @return {Promise}
   */
  deleteRestapi({ restapiId }) {
    return this.getFetcher().delete(
      `${this._getBaseUrl()}/restapis/${restapiId}`
    ).then(response => null);
  }

  /**
   * @todo Use Array.prototype.find polyfill instead of forEach
   * @param {String} path
   * @param {String} restapiId
   * @return {Promise}
   */
  findResourceByPath({ path, restapiId }) {
    return this.listResources({
      restapiId: restapiId,
      qsParams: {
        limit: 500,
      }
    }).then((resources) => {
      let matchedResource;
      resources.forEach((resource) => {
        if (resource.source.path === path) {
          matchedResource = resource;
        }
      });
      return matchedResource;
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
   * @param {String} httpMethod
   * @param {String} resourceId
   * @param {String} restapiId
   * @return {Promise}
   */
  getMethod({ httpMethod, resourceId, restapiId }) {
    return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}`
    ).then(source => new Method(source));
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  getRestapi({ restapiId }) {
    return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}`
    ).then(source => new Restapi(source));
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  getRootResource({ restapiId }) {
    return this.findResourceByPath({ path: '/', restapiId: restapiId });
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  listDeployments({ restapiId }) {
    return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}/deployments`
    ).then(body => body.item.map(source => new Deployment(source)));
  }

  /**
   * @param {String} restapiId
   * @return {Promise}
   */
  listResources({ restapiId, qsParams = {} }) {
    return this.getFetcher().get(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources`,
      qsParams
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
   * @param {Array.<String>=} cacheKeyParameters
   * @param {String=} cacheNamespace
   * @param {Boolean=} credentials
   * @param {String} httpMethod
   * @param {String=} integrationHttpMethod
   * @param {Object=} requestParameters
   * @param {Object=} requestTemplates
   * @param {String} resourceId
   * @param {String} restapiId
   * @param {String} type
   * @param {String=} uri
   * @return {Promise}
   */
  putIntegration({ cacheKeyParameters, cacheNamespace, credentials, httpMethod, integrationHttpMethod, requestParameters, requestTemplates, resourceId, restapiId, type, uri }) {
    return this.getFetcher().put(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/integration`,
      {
         cacheKeyParameters: cacheKeyParameters,
         cacheNamespace: cacheNamespace,
         credentials: credentials,
         httpMethod: integrationHttpMethod,
         requestParameters: requestParameters,
         requestTemplates: requestTemplates,
         type: type,
         uri: uri,
      }
    ).then(body => new Integration(body));
  }

  /**
   * @param {String} httpMethod
   * @param {String} resourceId
   * @param {Object=} responseParameters
   * @param {Object=} responseTemplates
   * @param {String} restapiId
   * @param {Object=} selectionPattern
   * @param {Integer} statusCode
   * @return {Promise}
   */
  putIntegrationResponse({ httpMethod, resourceId, responseParameters, responseTemplates, restapiId, selectionPattern, statusCode }) {
    return this.getFetcher().put(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/integration/responses/${statusCode}`,
      {
        selectionPattern: selectionPattern,
        responseParameters: responseParameters,
        responseTemplates: responseTemplates
      }
    ).then(body => new IntegrationResponse(body));
  }

  /**
   * @param {Boolean=} apiKeyRequired
   * @param {String=} authorizationType
   * @param {String} httpMethod
   * @param {Object=} requestModels
   * @param {Object=} requestParameters
   * @param {String} resourceId
   * @param {String} restapiId
   * @return {Promise}
   */
  putMethod({ apiKeyRequired, authorizationType, httpMethod, requestModels, requestParameters, resourceId, restapiId }) {
    return this.getFetcher().put(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}`,
      {
        apiKeyRequired: apiKeyRequired || false,
        authorizationType: authorizationType || 'NONE',
        requestModels: requestModels || {},
        requestParameters: requestParameters || {}
      }
    ).then(body => new Method(body));
  }

  /**
   * @param {String} httpMethod
   * @param {String} resourceId
   * @param {Object=} responseModels
   * @param {Object=} responseParameters
   * @param {String} restapiId
   * @param {Integer} statusCode
   * @return {Promise}
   */
  putMethodResponse({ httpMethod, resourceId, responseModels, responseParameters, restapiId, statusCode }) {
    return this.getFetcher().put(
      `${this._getBaseUrl()}/restapis/${restapiId}/resources/${resourceId}/methods/${httpMethod}/responses/${statusCode}`,
      {
        responseModels: responseModels || {},
        responseParameters: responseParameters || {}
      }
    ).then(body => new MethodResponse(body));
  }

  /**
   * @param {Function} middleware
   * @param {Object=} options
   * @return {Client}
   */
  use(middleware, options) {
    return new this.constructor({
      accessKeyId: this.accessKeyId,
      fetcher: this.getFetcher().use(middleware, options),
      region: this.region,
      secretAccessKey: this.secretAccessKey
    });
  }

  /**
   * @return {Fetcher}
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
   * @param {Resource} parentResource
   * @param {Array.<String>} pathParts
   * @param {String} restapiId
   * @return {Promise}
   */
  _createChildResources({ parentResource, pathParts, restapiId }) {
    if (pathParts.length > 0) {
      return this.findResourceByPath({
        path: path.join(parentResource.source.path, pathParts[0]),
        restapiId: restapiId
      }).then((resource) => {
        return resource || this.createResource({
          parentId: parentResource.source.id,
          pathPart: pathParts[0],
          restapiId: restapiId
        });
      }).then((resource) => {
        return this._createChildResources({
          parentResource: resource,
          pathParts: pathParts.slice(1),
          restapiId: restapiId
        });
      });
    } else {
      return Promise.resolve();
    }
  }

  /**
   * @param {Array.<String>} paths
   * @param {String} restapiId
   * @param {Resource} rootResource
   * @return {Promise}
   */
  _createResourcesByPaths({ paths, restapiId, rootResource }) {
    if (paths.length > 0) {
      return this._createChildResources({
        parentResource: rootResource,
        pathParts: paths[0].split('/').slice(1),
        restapiId: restapiId
      }).then(() => {
        return this._createResourcesByPaths({
          paths: paths.slice(1),
          restapiId: restapiId,
          rootResource: rootResource
        });
      });
    } else {
      return Promise.resolve();
    }
  }

  /**
   * @return {String}
   */
  _getBaseUrl() {
    return `https://apigateway.${this.region}.amazonaws.com`;
  }
}
