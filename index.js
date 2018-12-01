const assert = require('assert');


const Client = require('./src/client');
const SequencesHandler = require('./src/sequences');

/**
 * Wrapper for the Mixmax API.
 */
class MixmaxAPI {

  /**
   * Creates the Mixmax API wrapper.
   *
   * @param {String} apiKey The API key to use to authenticate all API calls
   * with.
   */
  constructor(apiKey) {
    assert(apiKey, 'apiKey must be provided');

    this._client = new Client(apiKey);
  }

  /**
   * Returns an authenticated `Sequences` handler.
   *
   * @returns {SequencesHandler} An authenticated `Sequences` API utility.
   */
  get sequences() {
    return new SequencesHandler(this._client);
  }
}

module.exports = MixmaxAPI;