const STARTTIME = Date.now();
console.log('start: ', new Date().toLocaleString('my-MM', { timeZone: 'Asia/Yangon' }));

const fetch = require('node-fetch');
const zg = require('is-zawgyi');
const { zg2uni } = require("rabbit-node");
const { parse } = require("fast-xml-parser");
const { rss: { feed }, xml } = require('./config');

function rssfeed(url) {
  return fetch(url).then(res => res.text()).then(res => parse(res, xml.options));
}

function trim(text) {
  return text.split("\n").map(n => n.trim()).filter(n => !!n).join("\n");
}

function convert(font) {
  return zg(font) ? zg2uni(font) : font;
}

/**------------**/
!async function () {
  let rss = [];
  
  await feed.map(
    async (url) => rss.push( await rssfeed(url) )
  );
  
  console.log(rss)
  
}().finally(
  () => console.log('exit: %dms | %s', Date.now() - STARTTIME, new Date().toLocaleString('my-MM', { timeZone: 'Asia/Yangon' }))
)

