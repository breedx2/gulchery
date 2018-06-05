'use strict';

const fetch = require('./fetch');
const parse = require('./parse');

fetch()
  .then(parse)
  .then(result => {
    console.log(JSON.stringify(result, null, '  '));
  });
