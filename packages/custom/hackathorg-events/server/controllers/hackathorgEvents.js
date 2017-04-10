'use strict';
var async = require('async');
var jwt = require('jsonwebtoken');
var Heroku = require('heroku-client')
var mongoose = require('mongoose'),
Event = mongoose.model('Event'),
User = mongoose.model('User');

module.exports = function(HackathorgEvents){
  return {
    all: function(req, res) {
      Event.find({}).exec(function (err, events) {
        if(err){
          console.log (err)
          res.send(500, 'Error: ' + err)
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
            console.log(req.body)
            eventdata = event
            heroku = new Heroku({token: event.heroku.apiKey})       

            var appName = req.body.name || event.title;
            var source = req.body.source || event.heroku.source
            var cb = function(resp){console.log('yay '+resp);callback(null,resp)}
            var cbe = function(resp){console.log('err '+resp);callback(resp, null)}

            heroku.post('/app-setups',  {debug: true, body: {app: {name: appName}, source_blob: {url: source}}}).then(cb).catch(cbe)
          },
          function (app, callback){
            console.log(app)
            eventdata.heroku.appName = app.app.name;
            eventdata.heroku.appId = app.app.id;
            eventdata.save(callback);
          }], 
          function (err, result){
            console.log(err)
            console.log(result)
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
            eventdata = event
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
            var heroku = new Heroku({token: event.heroku.apiKey})
            heroku.post('/apps/' + event.heroku.appId + '/builds', {body: {source_blob: {url: event.heroku.source}}}).then(callback)
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
