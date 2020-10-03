const assert = require("assert");

const got = require("got");

class PollsHandler {
  constructor(client) {
    assert(client, "client must be provided");

    this._client = client;
  }

  async get(id, fields) {
    let url = `polls/${id}`;
    if (fields) {
      url += `?expand=${fields}`;
    }
    const result = await this._client.get(url);
    if (result.statusCode !== 200) {
      throw new Error(`failed to retrieve poll: ${results.statusCode}`);
    }
    return result.body;
  }

  // TODO(ttacon): this does not include the rest of the varied options
  // (it's currently the bare minimum).
  async list({ next, previous } = {}) {
    if (next && previous) {
      throw new Error("cannot provide both `next` and `previous`");
    }

    let url = `polls`;
    if (next) url += `?next=${next}`;
    else if (previous) url += `?previous=${previous}`;

    const result = await this._client.get(url);

    if (result.statusCode !== 200) {
      throw new Error(`failed to list polls, status: ${result.statusCode}`);
    }

    return result.body;
  }
}

module.exports = PollsHandler;
