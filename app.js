var Hapi = require('hapi');
var geolib = require('geolib');

var app = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);

function getZipCoordinates(req, res) {
  var zip = req.params.zip;
}

// routes
app.route({
  method: 'GET',
  path: '/zip/{zip}',
  handler: getZipCoordinates
});

// start the app
app.start();
