'use strict';
var async = require('async')
var mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  User = mongoose.model('Event');

module.exports = function(HackathorgEvents){
  return {
    all: function(req, res) {
      Event.find({}).exec(function (err, events) {
        res.send(events);
      });
    },
    create: function (req, res) {
      console.log(req.body);
      async.waterfall([
        function( callback){ 
          User.find({email:{$in:req.body.hosts}})
                        .lean()
                        .distinct('_id').exec(callback);
        },
        function(result, callback){

          if (!result.includes(req.user._id)){
            result.push(req.user._id);
          }
          var event = new Event(req.body);
          event.ownerid = req.user._id;
          event.hosts = result;

          
          event.save(callback);
        }],
        function (err, event) {
          if (err){
            console.log(err)
            res.status(500)
          }
          res.json(event);
        }
      )
    },
    show: function (req, res) {
      Event.findOne({
          _id: req.params.eventid
        }).exec(function (err, event) {
          if (!err && event) {
            res.send(200,event);
        }
      });
    },
    update: function (req, res) {
      if (!req.params.eventid) return res.send(404, 'No name specified');

        Event.findOne({
          _id: req.params.eventid
        }).exec(function (err, event) {
          if (!err && event) {
            Event.findOneAndUpdate({
              _id: event._id
            }, {
              $set: req.body
            }, {
              multi: false,
              upsert: false
            }, function (err, circle) {
              if (err) {
                return res.send(500, err.message);
              }



              res.send(200, 'updated');
            });
          }
        });
      },
    userevents : function(req, res){
      Event.find({ownerid: req.user._id}).select('title organisation').exec(function (err, events) {
        res.send(events);
      });
    }   
  };
};
