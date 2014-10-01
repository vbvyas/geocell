// geocell model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeocellSchema = new Schema({
  zip: { type: String, trim: true },
  geocells: { type: [] }
});

mongoose.model('Geocell', GeocellSchema);
