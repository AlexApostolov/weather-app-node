const yargs = require('yargs');
const axios = require('axios');

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

// Replace spaces etc. for URI components to inject into URL
var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// axios library knows how to parse JSON data automatically without a setting for it
// .get returns a promise, so you can use .then to run code when a promise gets fullfilled/rejected
axios
  .get(geocodeURL)
  .then(response => {
    // In the response schema of the axios library, "data" is the response that was provided by the server
    if (response.data.status === 'ZERO_RESULTS') {
      // If the status ZERO_RESULTS is returned skip to the catch else statement below
      throw new Error('Unable to find that address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/254caa042e5270830fcd5f2f3f4a8bda/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    // Make a second call by returning a new promise
    return axios.get(weatherUrl);
  }) // When weather data arrives...
  .then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}.`
    );
  })
  .catch(e => {
    if (
      e.code === 'ECONNREFUSED' ||
      e.code === 'ENOTFOUND' ||
      e.code === 'ETIMEOUT'
    ) {
      console.log('Unable to connect to API servers/');
    } else {
      // Print the Error constructor message from earlier which is property name of "message"
      console.log(e.message);
    }
  });
