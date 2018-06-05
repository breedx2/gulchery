'use strict';

const parseString = require('xml2js').parseString;

function parse(html){
  return new Promise((fulfill, reject) => {
    const extracted = extractXml(html);
    parseString(extracted, (err, res) => {
      if(err){
        return reject(err);
      }
      fulfill(munge(res));
    })
  });
}

function extractXml(html){
  return html.replace(/^[\s\S]*<markers>(.*)<\/markers>[\s\S]*/, '<markers>$1</markers>');
}

function munge(json){
  return json;
}

module.exports = parse;
