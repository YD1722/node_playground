const crypto = require('crypto');

module.exports = function (inputMsg, inputItem, callback) {
  doHeavyStuff(inputItem);
  callback(null, `inputMsg | ${process.pid} | Hash finished`);
};

function doHeavyStuff(item) {
  crypto
    .createHmac('sha256', 'secret')
    .update(new Array(10000).fill(item).join('.'))
    .digest('hex');
}
