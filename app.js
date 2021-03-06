var Hapi = require('hapi');
require('sugar');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geocell_dev');
var Geocell = mongoose.model('Geocell');
var cells = require('./scripts/cells.json');

var app = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);

function getZipCoordinates(req, res) {
  var zip = req.params.zip;
  // check in db first
  Geocell.findOne({ zip: zip }, function (err, cell) {
    if (err) {
      // check in static data file
      cells.find(function (cell) {
        if (cell.zip == zip) {
          res(cell);
        } else {
          res({});
        }
      });
    } else {
      res(cell);
    }
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
