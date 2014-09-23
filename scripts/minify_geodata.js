var fs = require('fs');
var JSONStream = require('JSONStream');
var es = require('event-stream');

var writer = fs.createWriteStream('zip.json');
writer.write('[');

var reader = fs.createReadStream('zipgeodata.json');
reader.pipe(JSONStream.parse('features.*'))
.pipe(es.mapSync(function (data) {
  var td = { zip: data.properties.GEOID10, coordinates: data.geometry.coordinates };
  var stream = JSON.stringify(td, null, 2);
  stream += ',';
  writer.write(stream);
}));
