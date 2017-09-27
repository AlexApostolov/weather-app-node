// Simulate input recieved with a delay like a DB
var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

// When only one of the promises fails it prints strange results of a success message with undefined
// asyncAdd(5, '7')
//   .then(
//     result => {
//       console.log('Result: ', result);
//       // Promise Chaining. FIRST:
//       return asyncAdd(result, 33);
//     },
//     errorMessage => {
//       console.log(errorMessage);
//       // SECOND: If no error, take what's returned for next step
//     }
//   )
//   .then(
//     result => {
//       // If no problemo resolve
//       console.log('Should be 45 ', result);
//     },
//     errorMessage => {
//       console.log(errorMessage);
//     }
//   );

// Better approach from above using .catch
asyncAdd(5, '7')
  .then(result => {
    console.log('Result: ', result);
    return asyncAdd(result, 33);
  })
  .then(result => {
    console.log('Should be 45 ', result);
  })
  .catch(errorMessage => {
    console.log(errorMessage);
  });

// // The 2 args manage the state of your promise
// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Hey. It worked!');
//     reject('Unable to fulfill promise.');
//   }, 2500);
// });
//
// somePromise.then(
//   message => {
//     console.log('Success: ', message);
//   },
//   errorMessage => {
//     console.log('Aww snap: ', errorMessage);
//   }
// );
