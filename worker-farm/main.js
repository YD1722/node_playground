/**
 * Like with database connections, we need a pool of processes that are ready to
 * be used, run a task at a time in each one, and reuse the process once the task has finished.
 */
let workerFarm = require('worker-farm'),
  workers = workerFarm(require.resolve('./child')),
  ret = 0;

const arr = new Array(200000).fill('something_fishy');

for (let i = 0; i < arr.length; i++) {
  workers(`#${i} HASH`, arr[i], (err, result) => {
    console.log(result);

    if (++ret == arr.length) workerFarm.end(workers);
  });
}
