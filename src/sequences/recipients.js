const assert = require('assert');


class RecipientsHandler {
  /**
   * Creates an authenticated Sequence recipient helper.
   *
   * @param {Client} client An authenticated Mixmax API client.
   * @param {String} sequenceID The ID of the Sequence to interact with.
   */
  constructor(client, sequenceID) {
    assert(client, 'client must be provided');
    assert(sequenceID, 'sequenceId must be provided');

    this._client = client;
    this._sequenceID = sequenceID;
  }

  /**
   * List the recipients for the given sequence.
   *
   * @returns {Array<SequenceRecipient>} The recipients currently in the
   *   Sequence.
   */
  async list() {
    const url = `sequences/${this._sequenceID}/recipients/`;

    const result = await this._client.get(url);

    if (result.statusCode !== 200) {
      throw new Error('failed to list Sequence recipients, status: ' + result.statusCode);
    }
    
    return result.body;
  }

}


module.exports = RecipientsHandler;