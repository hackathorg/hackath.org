'use strict';

var mongoose = require('mongoose'),
  Follow = mongoose.model('Follow');

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
module.exports = function(HackathorgProfile){
  return {
    /*
    eventapplication: function (req, res){
    },
    userapplication: function (req, res){
    },
    apply: function (req, res){
      if its role = attend, add to the attending on event
      otherwise add to the application db
    },
    */
    follows: function(req, res) {
      var id = profileOrUser(req, res);
      Follow.findOne({_id: id}).select('follows').lean().exec(function (err, result) {
        console.log(result)
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
          var id = req.user._id
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
