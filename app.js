const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// Call function responsible for all the logic behind geolocation, and call back with either an error message/results
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    // Dynamically pass the longitude and latitude to the weather search function
    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(
            `It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`
          );
        }
      }
    );
  }
});
