# mixmax-api
Cheeky wrapper around the Mixmax API

## Installation

```sh
npm i mixmax-api
```

## Authentication

In order to use the `mixmax-api` library, you'll need a Mixmax API key. You can
retrieve this key from your Mixmax settings page. Once you have that key, you
can authenticate like so:

```js
const MixmaxAPI = require('mixmax-api');

const apiKey = 'super-secret-key'; // Your API key here.

const api = new MixmaxAPI(apiKey);
```


## Usage

### Sequences

```js
let sequenceID = 'sequence-id-here';

const sequence = api.sequences.sequence(sequenceID);
```

#### Add recipients to a Sequence

```js
sequence.addRecipients([{
    email: 'super-email@super.cool',
    variables: {
        email: 'super-email@super.cool'
    }
}].then((results) => {
    console.log(result);
});
```
