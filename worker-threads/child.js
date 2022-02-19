const { parentPort, workerData } = require('worker_threads');
const crypto = require('crypto');

function doHeavyStuff(item) {
  crypto
    .createHmac('sha256', 'secret')
    .update(new Array(10000).fill(item).join('.'))
    .digest('hex');
}

parentPort.on('message', (data) => {
  console.log('Data received', data);

  const numberOfElements = 100;
  const sharedBuffer = new SharedArrayBuffer(
    Int32Array.BYTES_PER_ELEMENT * numberOfElements
  );
  const arr = new Int32Array(sharedBuffer);

  for (let i = 0; i < numberOfElements; i += 1) {
    arr[i] = Math.round(Math.random() * 30);
  }

  setInterval(() => {
    console.log('First element of array : child ', arr[0]);
  }, 2000);

  parentPort.postMessage({ arr });
});

// let arr = workerData.hashArray;
//
// for (let i = 0; i <= arr.length; i++) {
//   if (i == arr.length) {
//     parentPort.postMessage('Done Processing');
//     return;
//   }
//
//   console.log(`${i} | Doing some heavy stuff`);
//   doHeavyStuff(arr[i]);
// }
