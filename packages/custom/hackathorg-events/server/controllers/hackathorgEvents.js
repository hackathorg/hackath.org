'use strict';

var mongoose = require('mongoose'),
  Event = mongoose.model('Event');

module.exports = function(HackathorgEvents){
  return {
    all: function(req, res) {
      Event.find({}).exec(function (err, events) {
        res.send(events);
      });
    },
    create: function (req, res) {
      var event = new Event(req.body);

      event.save(function (err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot save the event'
          });
        }
        res.json(event);
      });
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
      Event.find({ownerid: req.user._id}).exec(function (err, events) {
        res.send(events);
      });
    }   
  };
};
