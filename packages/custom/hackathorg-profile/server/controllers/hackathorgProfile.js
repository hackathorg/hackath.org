'use strict';
var async = require('async');
var mongoose = require('mongoose'),
  Follow = mongoose.model('Follow'),
  Application = mongoose.model('Application'),
  Event = mongoose.model('ApplicationEvent'),
  User = mongoose.model('User');

function profileOrUser(req, res){
  if (req.profile){
    return req.profile._id;
  }
  else if (req.user){
    return req.user._id;
  }
  else {
    res.send('No user selected');
  }
}

function addToEvent(req, res, callback){
  
      if (req.event.users){
        req.event.users.push({userId: req.application.userId, role: req.application.role});
      } else {
        req.event.users = [{userId: req.application.userId, role: req.application.role}];
      }
      req.event.save();
      if (req.userevents.events){
        req.userevents.events.push({eventId: req.application.eventId, role: req.application.role});
      } else {
        req.userevents.events = [{eventId: req.application.eventId, role: req.application.role}];
      }
      req.userevents.save();
      callback(null, 'OK');
        
}




function responseCallback(res){
  return function (err, result){
    if (err){
      res.send(500, 'Error: ' + err);
    }
    res.send(200, result);
  };
}
module.exports = function(HackathorgProfile){
  return {
    getUserEvents: function(res, req, next, id){
      async.waterfall(
        [
        function (callback){
          Application.findById(id, callback);
        },
        function(callback, application){
          req.application = application;
          async.parallel([
            function(callback){
              User.findById(application.userId, 'events', callback);
            },
            function(callback){
              Event.findById(application.eventId, 'users', callback);
            }
          ], 
          function(err, result){
              req.userevents = result[0];
              req.event = result[1];
              callback(err, result);
          });
        }
      ],
      function(err, result){
        if (err){
          console.log(err + result);
        }
        next();
      });
    },
      

    eventapplications: function (req, res){
      Event.findById(req.params.eventid, function(err, event){
        if (err){
          res.send(500);
          return;
        }
        if (event.users.some(function(user){return user.userId === req.user._id && user.role === 'organiser';})){
          Application.find({eventId: event._id}).exec(responseCallback(res));
        } else {
          res.send(403, 'Forbidden');
        }
      });

    },
    userapplications: function (req, res){
      Application.find({userId: req.user._id}).exec(responseCallback(res));
    },
    apply: function (req, res){
      Event.findOne({_id: req.params.eventid}).exec(function (err, event){
        if (err){
          console.log(err);
          res.send(500, err);
        }
        req.event = event;
        console.log( event);
        req.application = new Application(req.body);
        req.application.userId = req.user._id;
        req.application.status = 'pending';
        req.application.response = '';
        if (err){
          res.send(500, 'Error: ' + err);
        }
        if (!event){
          res.send(404, 'Event not found');
        }

        if ( event && event.requiresApplication && event.requiresApplication.indexOf(req.body.role) !== -1){
          req.application.save(function(err, result ){res.send(result); });
        } else {
          addToEvent(req, res, responseCallback(res));
        }
      });
    },
    cancelTicket: function (req, res) {
      Event.update({_id: req.params.eventid}, {$pull:{users:{userId:req.user._id}}}, responseCallback(res));
      User.update({_id: req.user._id}, {$pull: {events: {eventId: req.params.eventid}}});
    },
    cancelApplication: function (req, res) {
      Application.findByIdAndRemove(req.params.applicationId, {$pull:{users:{userId:req.user._id}}}, responseCallback(res));
    },
    


    review: function (req, res) {
      if (req.event.users.some(function(user){return user.userId === req.user._id && user.role === 'organiser';})){
        async.waterfall([
          function(callback){
              req.application.status = req.body.status;
              req.application.response = req.body.response;
              req.application.save(callback);
          },
          
          function(result, callback){
            if (req.body.status === 'accepted'){
              addToEvent(req, res, callback);
            }
          }
        ],
        responseCallback(res)
        );
      } else {
        res.send(403, 'Forbidden')
      } 
    },
    

    follows: function(req, res) {
      var id = profileOrUser(req, res);
      Follow.findOne({_id: id}).select('follows').lean().exec(function (err, result) {
        if (result.follows)
        res.send(result.follows);
        else {
          res.send('[]');
        }
      });
    },
    followers: function(req, res) {
      var id = profileOrUser(req, res);
      Follow.findOne({_id:id}).select('followers').lean().exec(function (err, result) {
        if (result.followers)
          res.send(result.followers);
        else {
          res.send('[]');
        }
      });
    },
    counts: function (req, res) {
      var id = '';
        if (req.profile){
          id = req.profile._id;
        }
        else if ( req.user){
          id = req.user._id;
        }
        else {
          res.send('No user selected');
        }

        Follow.aggregate([
            {$match: {userId: id}},
            {$project:{
                followers: {$size: '$followers'},
                follows: {$size: '$follows'}
            }}
        ]).exec(function (err, result){res.send(result);});
    }, 
    follow: function (req, res){
         Follow.findOneAndUpdate({_id: req.user._id, follows:{$not:{$elemMatch:{id:req.profile._id}}}}, 
        {$push: {follows:{id: req.profile._id, username: req.profile.username}}
      }, {new:true}).exec(function (err, followers) {console.log(followers); });
      Follow.findOneAndUpdate({_id: req.profile._id, followers:{$not:{$elemMatch:{id:req.user._id}}}}, 
        {$push: {followers:{id: req.user._id, username: req.user.username}}
      }, {new:true}).exec(function (err, followers) {console.log(followers); });


      res.send('OK');
    },
    unfollow: function (req, res) {
      Follow.update({_id: {$in:[req.profile._id, req.user._id]}}, {$pull:{follows:{id: req.profile._id}, followers:{id: req.user._id }}},{new: true, multi:true}, function(err, num){
        res.send(num);
      });
     
  }

   
  };
};
