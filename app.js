var Hapi = require('hapi');
require('sugar');
var cells = require('./scripts/cells.json');

var app = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);

function getZipCoordinates(req, res) {
  var zip = req.params.zip;
  cells.find(function (cell) {
    res(cell.zip == zip);
  });
}

// routes
app.route({
  method: 'GET',
  path: '/zip/{zip}',
  handler: getZipCoordinates
});

// start the app
app.start();
