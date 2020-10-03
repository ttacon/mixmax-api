const assert = require("assert");

const got = require("got");

class QAHandler {
  constructor(client) {
    assert(client, "client must be provided");

    this._client = client;
  }

  async get(id, fields) {
    let url = `qa/${id}`;
    if (fields) {
      url += `?expand=${fields}`;
    }
    const result = await this._client.get(url);
    if (result.statusCode !== 200) {
      throw new Error(`failed to retrieve poll: ${results.statusCode}`);
    }
    return result.body;
  }

  async list({ next, previous } = {}) {
    if (next && previous) {
      throw new Error("cannot provide both `next` and `previous`");
    }

    let url = `qa`;
    if (next) url += `?next=${next}`;
    else if (previous) url += `?previous=${previous}`;

    const result = await this._client.get(url);

    if (result.statusCode !== 200) {
      throw new Error(`failed to list qa, status: ${result.statusCode}`);
    }

    return result.body;
  }
}

module.exports = QAHandler;
