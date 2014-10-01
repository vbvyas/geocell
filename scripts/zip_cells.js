var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geocell_dev');
var Geocell = mongoose.model('Geocell');
var zips = require('./zip.json');
var constants = require('../constants.json');
var geolib = require('geolib');
var lib = require('../lib');
var fs = require('fs');
var writer = fs.createWriteStream('cells.json');
writer.write('[');

function convertToGeoCoordinates(shpCoordinates) {
  return shpCoordinates.map(function (point) {
    return { latitude: point[0], longitude: point[1] };
  });
}

function maxmin(coordinates, fn) {
  return coordinates.reduce(function (a, b) {
    return { latitude: fn(a.latitude, b.latitude), longitude: fn(a.longitude, b.longitude) };
  });
}

function latDivisions() {
  return (constants.latitude.max - constants.latitude.min) / Math.pow(4, constants.granularity);
}

function lngDivisions() {
  return (constants.longitude.max - constants.longitude.min) / Math.pow(4, constants.granularity);
}

var take10 = zips.slice(0, 20);

take10.forEach(function (obj) {
  console.log(obj.zip);
  var coords = convertToGeoCoordinates(obj.coordinates[0]);
  var min = maxmin(coords, Math.min);
  var max = maxmin(coords, Math.max);
  var latDiv = latDivisions();
  var lngDiv = lngDivisions();
  var cells = [];
  for (var lat = min.latitude; lat < max.latitude; lat += latDiv) {
    for (var lng = min.longitude; lng < max.longitude; lng += lngDiv) {
      var cell = lib.getCell(lat, lng, constants.granularity);
      if (geolib.isPointInside(cell.min, coords) || geolib.isPointInside(cell.max, coords)) {
        cells.push(cell);
      }
    }
  }

  // instead of writing to a file this could be commited to db
  if (cells.length > 0) { // don't add empty cells
    var zipCell = { zip: obj.zip, geocells: cells };
    var stream = JSON.stringify(zipCell, null, 2);
    stream += ',';
    writer.write(stream);
    zipCell.save(function (err) {
      if (err) {
        console.log('Failed to save geocell for:', obj.zip);
      }
    });
  }
});

writer.write(']');
writer.end();
