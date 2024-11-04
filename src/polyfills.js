//polyfill for withResolvers - iphone 7 doesn't support it
if (!Promise.withResolvers) {
    Promise.withResolvers = function() {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}