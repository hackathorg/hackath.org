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



mongoose.model('Follow', followSchema);


