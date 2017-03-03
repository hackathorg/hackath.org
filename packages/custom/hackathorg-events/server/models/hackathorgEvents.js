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
  hosts:[ObjectId], 
  tags:[String],
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  maxAttendees: Number,
  maxMentors: Number,
  location: String,
  sponsors: Boolean,
  skillLevel: String,
  mentors:[ObjectId],
  attendees:[ObjectId],
  heroku:{
    apiKey: String,
    refreshToken: String,
    appName: String,
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

mongoose.model('Event', eventSchema);


