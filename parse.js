'use strict';
const _ = require('lodash');
const cheerio = require('cheerio');

const parseString = require('xml2js').parseString;

function parse(html){
  const linkInfo = extractLinkInfo(html);
  // console.log(JSON.stringify(linkInfo, null, '  '));
  return new Promise((fulfill, reject) => {
    const extracted = extractXml(html);
    parseString(extracted, (err, res) => {
      if(err){
        return reject(err);
      }
      const result = combine(linkInfo, munge(res));
      fulfill(result);
    })
  });
}

function extractXml(html){
  return html.replace(/^[\s\S]*<markers>(.*)<\/markers>[\s\S]*/, '<markers>$1</markers>');
}

function extractLinkInfo(html){
  const $ = cheerio.load(html);
  const infos = $('.searchParkBlk').map((i, div) => {
    const link = $(div).find('.sheader').attr('href');
    return {
      name: $(div).find('.sheader').text(),
      parksAndRecPage: `https://www.portlandoregon.gov${link}`,
      amenities: $(div).find('.amenityImg').get().map(x => $(x).attr('title'))
    };
  }).get();
  return _.keyBy(infos, 'name');
}

function munge(json){
  return json.markers.marker
    .map( x => x.$)
    .map(x => _.pickBy(x, _.identity));
}

function combine(linkInfo, markers){
  return markers.map(x => {
    const info = linkInfo[x.desc];
    return _.assign(x, _.omit(info, 'name'));
  });
}

module.exports = parse;
