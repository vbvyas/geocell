var Hapi = require('hapi');
var geolib = require('geolib');
var request = require('request');
var parser = require('xml2js').parseString;
var lib = require('./lib');

var app = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);

// routes
app.route({
  method: 'GET',
  path: '/zip/{zip}',
  handler: function (req, res) {
    var zip = req.params.zip;
    var queryUrl = url + zip + key;
    request(queryUrl, function(err, request_res, body) {
      if (err) {
        res([]);
      } else {
        parser(body, function (err, result) {
          res(result);
        });
      }
    });
  }
});

app.route({
  method: 'GET',
  path: '/stations',
  handler: function (req, res) {
    var coordinate = {};
    coordinate.latitude = req.query.lat;
    coordinate.longitude = req.query.lng;
    var sorted = geolib.orderByDistance(coordinate, stations);
    var closest = [];
    for (var i = 0; i < sorted.length; i++) {
      var s = sorted[i];
      var station = stations[s.key];
      var point = {};
      point.name = station.name;
      point.abbr = station.abbr;
      point.distance = geolib.convertUnit('mi', s.distance); // miles
      closest.push(point);
    }
    res(closest);
  }
});

// start the app
app.start();
