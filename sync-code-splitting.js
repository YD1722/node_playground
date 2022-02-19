const crypto = require('crypto');

const arr = new Array(20000).fill('something');

function processAll() {
  console.log('processing heavy');

  for (const item of arr) {
    doHeavyStuff(item);
  }
}

function processChunk() {
  if (arr.length === 0) {
    console.log('All chunks processed');
  } else {
    console.log('processing chunk');

    const subArr = arr.splice(0, 10);

    for (const item of subArr) {
      doHeavyStuff(item);
    }

    setImmediate(processChunk);
  }
}

// processChunk();

function doHeavyStuff(item) {
  crypto
    .createHmac('sha256', 'secret')
    .update(new Array(10000).fill(item).join('.'))
    .digest('hex');
}

let interval = setInterval(() => {
  console.log('tick!');

  if (arr.length === 0) clearInterval(interval);
}, 0);

processChunk();
