const { Worker } = require('worker_threads');

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./child.js', { workerData });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run() {
  const arr = new Array(2000).fill('something_fishy');
  const result = await runService({ hashArray: arr });

  console.log(result);
}

run().catch((err) => console.error(err));
