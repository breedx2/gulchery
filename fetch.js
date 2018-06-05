'use strict';

const request = require('request-promise');

const URL = 'https://www.portlandoregon.gov/parks/finder/index.cfm?ShowResults=yes';

function fetch(){
  return request({
    method: 'GET',
    url: URL
  });
}

module.exports = fetch;
