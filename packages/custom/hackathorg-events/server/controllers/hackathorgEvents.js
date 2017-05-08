'use strict';
var async = require('async');
var Heroku = require('heroku-client');
var mongoose = require('mongoose'),
Event = mongoose.model('Event'),
User = mongoose.model('User');


module.exports = function(HackathorgEvents){
  return {
    all: function(req, res) {
      console.log(req.user._id)
      var userId = req.user._id;
      var projection =  {
          _id:1,
          title:1,
          organisation:1,
          description:1, 
          url:1,
          image:1,
          maxAttendees:1,
          maxMentors:1,
          users:{
              '$filter': {
                'input': '$users',
                'as': 'user',
                'cond': {
                  '$eq': [ '$$user.userId', userId ]
                }
              }
          },
          attendeesCount:{
            '$size': {
              '$filter': {
                'input': '$users',
                'as': 'user',
                'cond': {
                  '$eq': [ '$$user.role', 'Attendee' ]
                }
              }
            }
          },
          mentorCount:{
            '$size': {
              '$filter': {
                'input': '$users',
                'as': 'user',
                'cond': {
                  '$eq': [ '$$user.role', 'Mentor' ]
                }
              }
            }
          }
        };
      Event.aggregate([{$project:projection}]).exec(function (err, events) {
        if(err){
          console.log(err);
          res.send(500, 'Error: ' + err);
        }
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
          event.users = result.map(function(val) {return {userId: val, role: 'organiser'}});

          
          event.save(callback);
        }],
        function (err, event) {
          if (err){
            console.log(err);
            res.status(500);
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


            Event.update({
              _id: req.params.eventid, 
              users:{$elemMatch:{userId: req.user._id, role: 'organiser'}}
            }, {
              $set: req.body
            }, {
              multi: false,
              upsert: false
            }, function (err, result) {
              if (err) {
                return res.send(500, err.message);
              }
              res.send(200, result);
            });
          },
      
    userevents : function(req, res){
      Event.find({ownerid: req.user._id}).select('title organisation').exec(function (err, events) {
        res.send(events);
      });
    },   
    heroku:{
      create: function(req, res){
        var heroku;
        var eventdata;
        async.waterfall([
          function (callback){
            Event.findOne({_id: req.params.eventid, ownerid: req.user._id}).exec(callback)
          },
          function (event, callback){

            eventdata = event
            heroku = new Heroku({token: event.heroku.apiKey})       
            var source = req.body.source || event.heroku.source;
            var appName = req.body.appName || event.title;
            eventdata.heroku.source = req.body.source || event.heroku.source
            var cb = function(resp){console.log('yay '+resp);callback(null,resp)}
            var cbe = function(resp){console.log('err '+resp);callback(resp, null)}

            heroku.post('/app-setups',  {debug: true, body: {app: {name: appName}, source_blob: {url: source}}}).then(cb).catch(cbe)
          },
          function (app, callback){
            console.log(app.heroku)
            eventdata.heroku.appName = app.app.name;
            eventdata.heroku.appId = app.app.id;
            eventdata.save(callback);
          }], 
          function (err, result){

            if (err){
              console.log(err);
              res.send(500, err)
            } else{
            res.send(200, result);
            }
          }
        )
      },
      maintenance: function (req, res){

        async.waterfall([
          function (callback){
            Event.find({_id: req.params.eventid, ownerid: req.user._id}).exec(callback)
          },
          function (event, callback){
            var heroku = new Heroku({token: event.heroku.apiKey})
            heroku.post('/apps/' + event.heroku.appId).then(callback)
          },
 
          function (err, result){
            if (err){
              console.log(err);
              res.send(500, err)
            }
            res.send(200, result);
          }
        ])
      },
      setMaintenance: function (req, res){
        async.waterfall([
          function (callback){
            Event.find({_id: req.params.eventid, ownerid: req.user._id}).exec(callback)
          },
          function (event, callback){
            var heroku = new Heroku({token: event.heroku.apiKey})
            heroku.patch('/apps/' + event.heroku.appId, {body: {maintenance: req.params.maintenance}}).then(callback).catch(callback)
          },
 
          function (err, result){
            if (err){
              console.log(err);
              res.send(500, err)
            }
            res.send(200, result);
          }
        ])
      },
      rebuild: function (req, res){
        async.waterfall([
          function (callback){
            Event.find({_id: req.params.eventid, ownerid: req.user._id}).exec(callback)
          },
          function (event, callback){
            var source = req.body.source || event.heroku.source;
            var heroku = new Heroku({token: event.heroku.apiKey})
            heroku.post('/apps/' + event.heroku.appId + '/builds', {body: {source_blob: {url: source}}}).then(callback)
          },
 
          function (err, result){
            if (err){
              console.log(err);
              res.send(500, err)
            }
            res.send(200, result);
          }
        ])
      }


    }
  };
};
