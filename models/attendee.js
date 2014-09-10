var config = require('./config/config_server.js');

var mongoose = require('mongoose');
var Schema = mongoose.schema;

var attendeeSchema = Schema({
  name:     String,
  role:     String,
  rate:     Number
});

var model = mongoose.model('Attendee', attendeeSchema);

attendeeSchema.methods.create = function(details) {
  this.name = details.name;
  this.role = details.role;
  this.rate = details.rate;

  this.save(function(err, attendee) {
    console.log()
  }
}

