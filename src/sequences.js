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
}



module.exports = SequencesHandler;