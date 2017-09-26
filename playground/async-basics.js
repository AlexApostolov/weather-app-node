console.log('Starting app');

// 1st arg is a callback function, here we use an arrow function, 2nd arg is delay in ms
setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('2nd callback');
}, 0);

console.log('Finishing up');
