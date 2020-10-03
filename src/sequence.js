const assert = require('assert');

const RecipientsHandler = require('./sequences/recipients');

/**
 * Sequence utility class.
 */
class SequenceHandler {

  /**
   * Creates an authenticated Sequence helper.
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
   * Adds the given recipients to the Sequence. Allows for optional parameters
   * to control the recipient enrichment and send time.
   *
   * @param {Array<Recipient>} recipients The recipients to add to the Sequence.
   * @param {AddRecipientOptions} options Options for controlling recipient
   *   enrichment and send time.
   * @returns {Array<RecipientAddStatus>} The status for each recipient being
   *   added.
   */
  async addRecipients(recipients, {
    scheduledAt = Date.now(),
    enrich = false,
    allowMissingVariables = false
  } = {}) {
    const url = `sequences/${this._sequenceID}/recipients/`;

    const result = await this._client.post(url, { recipients });

    if (result.statusCode !== 200) {
      throw new Error('failed to add recipients to Sequence, status: ' + result.statusCode);
    }

    // The individual status of adding each recipient is embedded in the
    // returned `recipients` property.
    return result.body.recipients;
  }

  async pause() {
    const result = await this._client.post(`sequences/${this._sequenceID}/pause`);

    if (result.statusCode !== 200) {
      throw new Error('failed to pause Sequence, status: ' + result.statusCode);
    }
  }

  async resume() {
    const result = await this._client.post(`sequences/${this._sequenceID}/resume`);

    if (result.statusCode !== 200) {
      throw new Error('failed to resume Sequence, status: ' + result.statusCode);
    }
  }

  get recipients() {
    return new RecipientsHandler(this._client, this._sequenceID);
  }

  async get() {
    const result = await this._client.get(`sequences/${this._sequenceID}`);

    if (result.statusCode !== 200) {
      throw new Error('failed to resume Sequence, status: ' + result.statusCode);
    }
    return result.body;
  }

  

}

module.exports = SequenceHandler;