const assert = require("assert");

const got = require("got");

class SidebarHandler {
  constructor(client) {
    assert(client, "client must be provided");

    this._client = client;
  }

  async get(id) {
    let url = `integrations/sidebars/${id}`;
    const result = await this._client.get(url);
    if (result.statusCode !== 200) {
      throw new Error(`failed to retrieve sidebar: ${result.statusCode}`);
    }
    return result.body;
  }

  async delete(id) {
    let url = `integrations/sidebars/${id}`;
    const result = await this._client.delete(url);
    if (result.statusCode !== 200) {
      throw new Error(`failed to delete sidebar: ${result.statusCode}`);
    }
  }

  async create(body) {
    let url = `integrations/sidebars`;
    const result = await this._client.post(url, body);
    if (result.statusCode !== 200) {
      throw new Error(`failed to delete sidebar: ${result.statusCode}`);
    }
    return result.body;
  }

  async list({ next, previous } = {}) {
    if (next && previous) {
      throw new Error("cannot provide both `next` and `previous`");
    }

    let url = `integrations/sidebars`;
    if (next) url += `?next=${next}`;
    else if (previous) url += `?previous=${previous}`;

    const result = await this._client.get(url);

    if (result.statusCode !== 200) {
      throw new Error(`failed to list sidebars, status: ${result.statusCode}`);
    }

    return result.body;
  }


}

module.exports = SidebarHandler;
