const assert = require("assert");

// Not const for testing.
let got = require("got");

/**
 * A utility client for sending API requests to Mixmax.
 */
class Client {
  /**
   * Creates the Mixmax API client with the provided API key.
   *
   * @param {String} apiKey The API key to use to authenticate.
   */
  constructor(apiKey) {
    assert(apiKey, "apiKey must be provided");

    this._apiKey = apiKey;
  }

  /**
   * Sends a POST request to the given Mixmax URL with the given body.
   *
   * @param {String} url The URL to POST to.
   * @param {Object} body The body to send.
   * @returns {Promise<GotResponse>} The HTTP response.
   */
  async post(url, body) {
    return got.post(this.url(url), {
      headers: {
        "X-API-Token": this._apiKey
      },
      json: true,
      body
    });
  }

  async patch(url, body) {
    return got.patch(this.url(url), {
      headers: {
        "X-API-Token": this._apiKey
      },
      json: true,
      body
    });
  }

  url(fragment) {
    return `https://api.mixmax.com/v1/${fragment}`;
  }

  /**
   * Sends a GET request to Mixmax for the specified URL.
   *
   * @param {String} url The URL to GET.
   * @returns {Promise<GotResponse>} The HTTP response.
   */
  async get(url) {
    return got(this.url(url), {
      headers: {
        "X-API-Token": this._apiKey
      },
      json: true
    });
  }

  /**
   * Sends a DELETE request to Mixmax for the specified URL.
   *
   * @param {String} url The URL to DELETE.
   * @returns {Promise<GotResponse>} The HTTP response.
   */
  async delete(url) {
    return got.delete(this.url(url), {
      headers: {
        "X-API-Token": this._apiKey
      },
      json: true
    });
  }
}

module.exports = Client;
