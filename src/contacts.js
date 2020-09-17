const assert = require("assert");

const got = require("got");

class ContactsHandler {
  constructor(client) {
    assert(client, "client must be provided");

    this._client = client;
  }

  async get(id, fields) {
    let url = `contacts/${id}`;
    if (fields) {
      url += `?expand=${fields}`;
    }
    const result = await this._client.get(url);
    if (result.statusCode !== 200) {
      throw new Error(`failed to retrieve contact: ${results.statusCode}`);
    }
    return result.body;
  }

  // TODO(ttacon): this does not include the rest of the varied options
  // (it's currently the bare minimum).
  async list({ next, previous } = {}) {
    if (next && previous) {
      throw new Error("cannot provide both `next` and `previous`");
    }

    let url = `contacts`;
    if (next) url += `?next=${next}`;
    else if (previous) url += `?previous=${previous}`;

    const result = await this._client.get(url);

    if (result.statusCode !== 200) {
      throw new Error(`failed to list contacts, status: ${result.statusCode}`);
    }

    return result.body;
  }

  async create(data) {
    const result = await this._client.post("contacts", data);
    if (result.statusCode !== 204) {
      throw new Error(
        `failed to create a contact, status: ${result.statusCode}`
      );
    }
  }

  async update(id, updates) {
    const result = await this._client.patch("contacts", data);
    if (result.statusCode !== 200) {
      throw new Error(
        `failed to create a contact, status: ${result.statusCode}`
      );
    }
    return result.body;
  }
}

module.exports = ContactsHandler;
