export function timeSleep(delay = 1500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, delay);
  });
}
