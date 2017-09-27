const request = require('request');

// https://api.darksky.net/forecast/254caa042e5270830fcd5f2f3f4a8bda/26.3494101,-80.2153998

var getWeather = (lat, lon, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/254caa042e5270830fcd5f2f3f4a8bda/${lat},${lon}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback('Unable to fetch weather.');
      }
    }
  );
};

module.exports.getWeather = getWeather;
