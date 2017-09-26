const request = require('request');
const yargs = require('yargs');

// Object that stores the final parsed output
// It takes the input from the process variable and pass it through yargs
const argv = yargs
  .options({
    // "a" is going to be short for address
    a: {
      demand: true, // we need an address to fetch with
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true // always parse "a"/"address" as a string
    }
  })
  .help()
  .alias('help', 'h').argv; // 1st arg the actual agrument, 2nd arg is alias

// console.log(argv);

// Replace spaces etc. for URI components to inject into URL
var encodedAddress = encodeURIComponent(argv.address);

// Use "request" library to make a request, 1 arg options, 2nd arg callback called once data comes back
request(
  {
    // use the options object to pass a URL and have it convert the JSON to an object for us
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, // Callback function with arguments just like in the "request" docs
  (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }
);
