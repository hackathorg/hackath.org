'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var followSchema = new Schema({
  userId:{type: ObjectId, index: true},
  follows: [{
      id: ObjectId,
      username: String,
  }],
  followers:[{
      id: ObjectId,
      username: String,
  }]
});

var applicationSchema = new Schema({
  userId:{type: ObjectId, index: true},
  eventId:{type: ObjectId, index: true},
  username: String,
  role: String,
  description: String,
  site: String,
  contact: String,
  proposal: String,
  status: String,
  response: String
});

mongoose.model('Follow', followSchema, 'users');
mongoose.model('Application', applicationSchema);


