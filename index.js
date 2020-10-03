const assert = require("assert");

const Client = require("./src/client");
const ContactsHandler = require("./src/contacts");
const SequencesHandler = require("./src/sequences");
const OrgsHandler = require("./src/orgs");
const PollsHandler = require("./src/polls");
const QAHandler = require("./src/qa");
const YesNoHandler = require("./src/yesno");

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
    assert(apiKey, "apiKey must be provided");

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

  /**
   * Returns an authenticated `Contacts` handler.
   *
   * @returns {ContactsHandler} An authenticated `Contacts` API utility.
   */
  get contacts() {
    return new ContactsHandler(this._client);
  }

  /**
   * Returns an authenticated `Orgs` handler.
   *
   * @returns {OrgsHandler} An authenticated `Orgs` API utility.
   */
  get orgs() {
    return new OrgsHandler(this._client);
  }

  /**
   * Returns an authenticated `Polls` handler.
   *
   * @returns {PollsHandler} An authenticated `Polls` API utility.
   */
  get polls() {
    return new PollsHandler(this._client);
  }

  /**
   * Returns an authenticated `QA` handler.
   *
   * @returns {QAHandler} An authenticated `QA` API utility.
   */
  get qa() {
    return new QAHandler(this._client);
  }

  /**
   * Returns an authenticated `YesNo` handler.
   *
   * @returns {YesNoHandler} An authenticated `YesNo` API utility.
   */
  get yesno() {
    return new YesNoHandler(this._client);
  }
}

module.exports = MixmaxAPI;
