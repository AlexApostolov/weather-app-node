const request = require('request');

var geocodeAddress = (address, callback) => {
  // Replace spaces etc. for URI components to inject into URL
  var encodedAddress = encodeURIComponent(address);

  // Use "request" library to make a request, 1 arg options, 2nd arg callback called once data comes back
  request(
    {
      // use the options object to pass a URL and have it convert the JSON to an object for us
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, // Callback function with arguments just like in the "request" docs
    (error, response, body) => {
      if (error) {
        // If for example the internet connection is down
        callback('Unable to connect to Google servers.');
        // If Google API returns "status: ZERO_RESULTS" because the address is invalid
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address.');
        // If results received successfully
      } else if (body.status === 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
