'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  title:  {type: String, unique: true},
  description: String,
  organisation: String,
  startDate: Date,
  logo: String,
  image:String,
  url:   String,
  ownerid: ObjectId,
  tags:[String],
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  maxAttendees: Number,
  maxMentors: Number,
  location: String,
  sponsors: Boolean,
  skillLevel: String,
  noApplication: [String],
  users: [{
    userId: ObjectId,
    role: String
  }],
  heroku:{
    apiKey: String,
    refreshToken: String,
    appName: String,
    appId: String,
    source: String
  }
});

eventSchema.methods.isOwner = function (userId){
  return this.ownerid === userId;
}
eventSchema.methods.isHost = function (userId){
  return this.hosts.includes(userId);
}
eventSchema.methods.isMentor = function (userId){
  return this.mentors.includes(userId);
}
eventSchema.methods.isattendee = function (userId){
  return this.attendees.includes(userId);
}
eventSchema.methods.toJSON = function() {
  var obj = this.toObject();
  if (obj.heroku){
    delete obj.heroku.apiKey;
    delete obj.heroku.refreshToken;
  }
  return obj;
};
mongoose.model('Event', eventSchema);


