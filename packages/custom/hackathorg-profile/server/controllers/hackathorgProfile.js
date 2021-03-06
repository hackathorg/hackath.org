'use strict';
var async = require('async');
var mongoose = require('mongoose'),
  Follow = mongoose.model('Follow'),
  Application = mongoose.model('Application'),
  Event = mongoose.model('ApplicationEvent'),
  UserEvent = mongoose.model('UserEvent'),
  UserProfile = mongoose.model('Profile');

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
        req.event.users.push({userId: req.application.userId, username: req.application.username, role: req.application.role});
      } else {
        req.event.users = [{userId: req.application.userId, username: req.application.username, role: req.application.role}];
      }
      req.event.save();
      if (req.userevents.events){
        req.userevents.events.push({eventId: req.application.eventId, eventtitle: req.application.eventtitle,role: req.application.role});
      } else {
        req.userevents.events = [{eventId: req.application.eventId, eventtitle: req.application.eventtitle, role: req.application.role}];
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
    getUserEvents: function(req, res, next, id){
      async.waterfall(
        [
        function (callback){
          Application.findById(id, callback);
        },
        function( application, callback){
          req.application = application;

          async.parallel([
            function(callback){
              UserEvent.findById(application.userId, 'events', callback);
            },
            function(callback){
              Event.findById(application.eventId, 'users', callback);
            }
          ], 
          function(err, result){
            if (err){
              next(err);
            } else {
              req.userevents = result[0];
              req.event = result[1];
              next();
            }
          });
        }
      ]);
    },
    myevents: function(req, res){
      UserEvent.findById(profileOrUser(req, res), 'events', function(err, result){
      if (err){
        res.status(500).send(err);
      }else {
        res.send(result);
      }
    });
  },
    updateProfile: function (req, res){
      UserProfile.findOneAndUpdate({_id: req.user._id}, {$set: req.body}, {new: true, projection:{
        email:1,public:1, name:1, tags:1, username:1, location:1, bio:1, website:1, events: 1}
      }).exec(function(err, result){
        if (err){
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result); 
        }
      })
      
    },
    getProfile: function (req, res){
      
      UserProfile.findOne({_id: profileOrUser(req, res)},{
        public:1, name:1, tags:1, username:1, location:1, bio:1, website:1, events: 1}
      ).exec(function(err, result){
        if (err){
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result); 
        }
      })
      
    },

    eventapplications: function (req, res){
      Event.findById(req.params.eventid, function(err, event){
        if (err){
          res.send(500);
          return;
        }
        if (event.users.some(function(user){
          console.log(user);
          return user.userId.toString() === req.user._id.toString() && user.role.toLowerCase() === 'organiser';})){
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
      async.parallel([
        function(callback){
          Event.findOne({_id: req.params.eventid}).exec(callback);
        },
        function(callback){
          UserEvent.findOne({_id: req.user._id}).exec(callback);
        }], function (err, result){
        if (err){
          console.log(err);
          res.send(500, err);
        }
        req.event = result[0];
        
        req.userevents = result[1];
        req.application = new Application(req.body);
        req.application.userId = req.user._id;
        req.application.username = req.user.username;
        req.application.status = 'Pending';
        req.application.response = '';
        req.application.eventtitle = req.event._doc.title;
        console.log(req.application.eventtitle);
        console.log(req.event._doc);
        console.log(req.event);
        if (err){
          res.send(500, 'Error: ' + err);
        }
        if (!result[0]){
          res.send(404, 'Event not found');
        }
        
        if ( req.event.noApplication.indexOf(req.body.role.toLowerCase()) === -1){
          req.application.save(function(err, result ){res.send(result); });
        } else {
          addToEvent(req, res, responseCallback(res));
        }
      });
    },
    cancelTicket: function (req, res) {
      Event.update({_id: req.params.eventid}, {$pull:{users: {userId:req.user._id}}}, responseCallback(res));
      UserEvent.update({_id: req.user._id}, {$pull: {events: {eventId: req.params.eventid}}});
    },
    cancelApplication: function (req, res) {
      Application.findByIdAndRemove(req.params.applicationId, responseCallback(res));
    },
    


    review: function (req, res) {
      if (req.event.users.some(function(user){return user.userId.toString() === req.user._id.toString() && user.role.toLowerCase() === 'organiser';})){
        async.waterfall([
          function(callback){
              req.application.status = req.body.status;
              req.application.response = req.body.response;
              req.application.save(callback);
          },
          
          function(result, num, callback){
            if (req.body.status === 'accepted'){
              addToEvent(req, res, callback);
            }
          }
        ],
        responseCallback(res)
        );
      } else {
        res.send(403, 'Forbidden');
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
