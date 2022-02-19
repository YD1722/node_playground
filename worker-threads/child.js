const { parentPort, workerData } = require('worker_threads');
const crypto = require('crypto');

function doHeavyStuff(item) {
  crypto
    .createHmac('sha256', 'secret')
    .update(new Array(10000).fill(item).join('.'))
    .digest('hex');
}

let arr = workerData.hashArray;

for (let i = 0; i <= arr.length; i++) {
  if (i == arr.length) {
    parentPort.postMessage('Done Processing');
    return;
  }

  console.log(`${i} | Doing some heavy stuff`);
  doHeavyStuff(arr[i]);
}
