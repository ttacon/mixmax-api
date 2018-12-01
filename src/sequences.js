const assert = require('assert');

let got = require('got');

const SequenceHandler = require('./sequence');

/**
 * The top level utility class for Sequences.
 */
class SequencesHandler {

  /**
   * Creates the Sequences handler.
   *
   * @param {Client} client The authenticated client to use.
   */
  constructor(client) {
    assert(client, 'client must be provided');

    this._client = client;
  }

  /**
   * Returns an authenticated `Sequence` handler for the given Sequence.
   *
   * @param {String} id The ID of the Sequence to interact with.
   * @returns {SequenceHandler} An authenticated `SequenceHandler`.
   */
  sequence(id) {
    return new SequenceHandler(this._client, id);
  }

  /**
   * List the Sequences that we have access to.
   *
   * @param {PaginationOptions} options Optional pagination parameters.
   * @returns {Array<Sequences>} The Sequences available to the user.
   */
  async list({ next, previous } = {}) {
    if (next && previous) {
      throw new Error('cannot provide both `next` and `previous`');
    }

    let url = `https://api.mixmax.com/v1/sequences/`;
    if (next) url += `?next=${next}`;
    else if (previous) url += `?previous=${previous}`;

    const result = await this._client.get(url);

    if (result.statusCode !== 200) {
      throw new Error('failed to list Sequences, status: ' + result.statusCode);
    }

    return result.body;
  }
}



module.exports = SequencesHandler;