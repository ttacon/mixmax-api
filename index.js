const assert = require('assert');

const SequencesHandler = require('./src/sequences');

class MixmaxAPI {
  constructor(apiKey) {
    assert(apiKey, 'apiKey must be provided');

    this._apiKey = apiKey;
  }

  get sequences() {
    return new SequencesHandler(this._apiKey);
  }
}

module.exports = MixmaxAPI;