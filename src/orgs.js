const assert = require("assert");

const got = require("got");

const CUSTOM_DOMAIN_TYPES = ["calendar", "tracking"];

class OrgsHandler {
  constructor(client) {
    assert(client, "client must be provided");

    this._client = client;
  }

  /**
   * Retrieves the custom domain for the given type, if it exists.
   *
   * @param {string} domainType The type of custom domaint to retrieve.
   * @returns {Object} The custom domain.
   */
  async getCustomDomain(domainType) {
    if (CUSTOM_DOMAIN_TYPES.indexOf(domainType) < 0) {
      throw new Error("invalid domain type");
    }

    const url = `orgs/me/custom-domains/${domainType}`;
    const result = await this._client.get(url);
    if (result.statusCode === 204) {
      return null;
    } else if (result.statusCode === 200) {
      return result.body;
    }
    throw new Error(
      `failed to retrieve custom domain, status: ${result.statusCode}`
    );
  }

  /**
   * Create a new custom domain with of the given type with the given name.
   *
   * @param {string} domainType The type of custom domaint to create.
   * @param {string} name The name of the new custom domain to create (the DNS name).
   * @returns {Object} The custom domain.
   */
  async createCustomDomain(domainType, name) {
    if (CUSTOM_DOMAIN_TYPES.indexOf(domainType) < 0) {
      throw new Error("invalid domain type");
    }

    const url = `orgs/me/custom-domains/${domainType}`;
    const result = await this._client.post(url, {
      domain: name
    });
    if (result.statusCode === 201) {
      return result.body;
    }
    throw new Error(
      `failed to retrieve custom domain, status: ${result.statusCode}`
    );
  }

  /**
   * Deletes the custom domain with the given type.
   *
   * @param {string} domainType The type of custom domain to create.
   * @throws {Error} If the domain couldn't be removed, this function will throw (reject).
   */
  async deleteCustomDomain(domainType) {
    if (CUSTOM_DOMAIN_TYPES.indexOf(domainType) < 0) {
      throw new Error("invalid domain type");
    }

    const url = `orgs/me/custom-domains/${domainType}`;
    const result = await this._client.delete(url);
    if (result.statusCode === 204) {
      return;
    }
    throw new Error(
      `failed to retrieve custom domain, status: ${result.statusCode}`
    );
  }
}

module.exports = OrgsHandler;
