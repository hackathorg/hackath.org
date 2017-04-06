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
applicationSchema.index({userId:1, eventId:1}, {unique: true})
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  requiresApplication: [String],
  users: [{
    userId: ObjectId,
    role: String
  }],

});


eventSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.heroku;
  return obj;
};
mongoose.model('ApplicationEvent', eventSchema, 'events');



mongoose.model('Follow', followSchema, 'users');
mongoose.model('Application', applicationSchema);


