const zg = require('is-zawgyi');
const { zg2uni } = require('rabbit-node');

function toUnicode(text) {
    return text.split('\n').map(txt => zg(txt) ? zg2uni(txt) : txt).join('\n');
}

module.exports = toUnicode;