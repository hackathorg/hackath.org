'use strict';
var async = require('async');
var mongoose = require('mongoose'),
  Follow = mongoose.model('Follow'),
  Application = mongoose.model('Application'),
  Event = mongoose.model('ApplicationEvent');

function profileOrUser(req, res){
  if (req.profile){
    return req.profile._id
  }
  else if (req.user){
    return req.user._id
  }
  else {
    res.send('No user selected')
  }
}

function addToEvent(req, res, application, event){
  
  if (req.event.users){
    event.users.push({userId: application.userId, role: application.role})
  } else {
    event.users = [{userId: application.userId, role: application.role}]
  }
  req.event.save(responseCallback(res))
}

function responseCallback(res){
  return function (err, result){
    if (err){
      res.send(500, 'Error: ' + err);
    }
    res.send(200, result);
  }
}
module.exports = function(HackathorgProfile){
  return {
    eventapplications: function (req, res){
      Application.find({userId: req.user._id}).exec(responseCallback(res))
    },
    userapplications: function (req, res){
      Application.find({userId: req.user._id}).exec(responseCallback(res))
    },
    apply: function (req, res){
      Event.findOne({_id: req.params.eventid}).exec(function (err, event){
        if (err){
          console.log(err)
          res.send(500, err)
        }
        req.event = event;
        console.log( event);
        var application = new Application(req.body);
        application.userId = req.user._id;
        if (err){
          res.send(500, 'Error: ' + err)
        }
        if (!event){
          res.send(404, 'Event not found')
        }

        if ( event && event.requiresApplication && event.requiresApplication.indexOf(req.body.role) !== -1){

          application.save(function(err, result ){res.send('result')})
        } else {
          addToEvent(req, res, application,  event)
        }
      });
    },
    cancelTicket: function (req, res) {
      Event.update({_id: req.params.eventid}, {$pull:{users:{userId:req.user._id}}}, responseCallback(res))

    },
    cancelApplication: function (req, res) {
      Application.update({_id: req.params.eventid}, {$pull:{users:{userId:req.user._id}}}, responseCallback(res))
    },
    


    review: function (req, res) {
        res.send(418, 'Not Implemented\nSee Status Code')
    },

    follows: function(req, res) {
      var id = profileOrUser(req, res);
      Follow.findOne({_id: id}).select('follows').lean().exec(function (err, result) {
        if (result.follows)
        res.send(result.follows);
        else {
          res.send('[]')
        }
      });
    },
    followers: function(req, res) {
      var id = profileOrUser(req, res);
      Follow.findOne({_id:id}).select('followers').lean().exec(function (err, result) {
        if (result.followers)
          res.send(result.followers);
        else {
          res.send('[]')
        }
      });
    },
    counts: function (req, res) {
      var id = ''
        if (req.profile){
          id = req.profile._id
        }
        else if ( req.user){
          id = req.user._id
        }
        else {
          res.send('No user selected')
        }

        Follow.aggregate([
            {$match: {userId: id}},
            {$project:{
                followers: {$size: '$followers'},
                follows: {$size: '$follows'}
            }}
        ]).exec(function (err, result){res.send(result)})
    }, 
    follow: function (req, res){
         Follow.findOneAndUpdate({_id: req.user._id, follows:{$not:{$elemMatch:{id:req.profile._id}}}}, 
        {$push: {follows:{id: req.profile._id, username: req.profile.username}}
      }, {new:true}).exec(function (err, followers) {console.log(followers)});
      Follow.findOneAndUpdate({_id: req.profile._id, followers:{$not:{$elemMatch:{id:req.user._id}}}}, 
        {$push: {followers:{id: req.user._id, username: req.user.username}}
      }, {new:true}).exec(function (err, followers) {console.log(followers)});


      res.send('OK')
    },
    unfollow: function (req, res) {
      Follow.update({_id: {$in:[req.profile._id, req.user._id]}}, {$pull:{follows:{id: req.profile._id}, followers:{id: req.user._id }}},{new: true, multi:true}, function(err, num){
        res.send(num);
      })
     
  }

   
  };
};
