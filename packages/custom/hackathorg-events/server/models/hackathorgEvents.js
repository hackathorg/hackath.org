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
  hosts:[String], 
  tags:[String],
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  mentors:[ObjectId],
  attendees:[ObjectId]
});

mongoose.model('Event', eventSchema);


