const { Worker, MessageChannel } = require('worker_threads');

const { port1, port2 } = new MessageChannel();

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./child.js');

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });

    worker.postMessage(workerData);
  });
}

function runWorker() {}

async function run() {
  // const arr = new Array(2000).fill('something_fishy');
  const result = await runService({ name: 'yd' });
  const { arr } = result;

  setTimeout(() => {
    arr[0] = 12321;

    console.log('Changing First element of array : parent');
  }, 5000);

  console.log(result);
}

run().catch((err) => console.error(err));
