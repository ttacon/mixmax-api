let got = require('got');

class SequencesHandler {
  constructor(apiKey) {
    assert(apiKey, 'apiKey must be provided');

    this._apiKey = apiKey;
  }

  sequence(id) {
    return new SequenceHandler(this._apiKey, id);
  }

}

class SequenceHandler {
  constructor(apiKey, sequenceId) {
    assert(apiKey, 'apiKey must be provided');
    assert(sequenceId, 'sequenceId must be provided');

    this._apiKey = apiKey;
    this._sequenceId = sequenceId;
  }

  async addRecipients(recipients, {
    scheduledAt = Date.now(),
    enrich = false,
    allowMissingVariables = false
  } = {}) {
    const url = `https://api.mixmax.com/v1/sequences/${this._sequenceId}/recipients/`;

    const result = await got(url, {
      headers: {
        'X-API-Token': this._apiKey
      },
      json: true,
      body: {
        recipients
      }
    });

    return result.body;
  }

}


module.exports = SequencesHandler;