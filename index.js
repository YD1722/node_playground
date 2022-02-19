const bar = () => console.log('bar');

const baz = () => console.log('baz');

const callback = () => console.log('I am callback');

const callee = (callback) => {
  callback();
};

const foo = () => {
  let i = 21;

  console.log('foo');

  setTimeout(() => {
    console.log(`After timeout ${i}`);
  }, 10);

  /**
   * A setTimeout() callback with a 0ms delay is very similar to setImmediate().
   * The execution order will depend on various factors, but they will be both run in the next iteration of the event loop.
   */
  setImmediate(() => {
    console.log(`After immediate ${i}`);
    i = 36;
  });

  /**
   * When we pass a function to process.nextTick(),
   * we instruct the engine to invoke this function at the end of the current operation,
   * before the next event loop tick starts:
   */
  process.nextTick(() => {
    console.log('Next Tick');
    i = 33;
  });

  console.log('i value', i);

  new Promise((resolve, reject) => resolve('Promise resolved')).then(
    (resolve) => console.log(resolve)
  );

  console.log('foo1');

  callee(callback);

  baz();
};

foo();
