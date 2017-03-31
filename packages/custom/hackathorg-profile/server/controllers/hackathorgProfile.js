'use strict';

var mongoose = require('mongoose'),
  Follow = mongoose.model('Follow');

function profileOrUser(req, res){
  if (req.profile){
    return req.profile._id
  }
  else if ( req.user){
    return req.user._id
  }
  else {
    res.send('No user selected')
  }
}
module.exports = function(HackathorgProfile){
  return {
    follows: function(req, res) {
      var id = profileOrUser(req, res);
      Follow.findOneAndUpdate({userId: id}, {$setOnInsert:{userId: id, follows: [], followers: []}}, {new:true,upsert:true}).select('follows -_id').lean().exec(function (err, result) {
        res.send(result.follows);
      });
    },
    followers: function(req, res) {
      var id = profileOrUser(req, res);
      Follow.findOneAndUpdate({userId:id}, {$setOnInsert:{userId:id, follows: [], followers: []}}, {new:true,upsert:true}).select('followers -_id').lean().exec(function (err, result) {
        res.send(result.followers);
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
      Follow.findOneAndUpdate({follower: req.user._id}, {$setOnInsert:{userId:req.user._id, follows: [], followers: []}}, {new:true,upsert:true}).exec(function (err, followers) {
        Follow.findOneAndUpdate({userId: req.user._id, follows:{$not:{$elemMatch:{id:req.profile._id}}}}, 
        {$push: {follows:{id: req.profile._id, username: req.profile.username}}
      }, {new:true}).exec(function (err, followers) {console.log(followers)});
    });
      Follow.findOneAndUpdate({userId: req.profile._id}, {$setOnInsert:{userId:req.profile._id, follows: [], followers: []}}, {new:true,upsert:true}).exec(function (err, followers) {
        Follow.findOneAndUpdate({userId: req.profile._id, followers:{$not:{$elemMatch:{id:req.user._id}}}}, 
        {$push: {followers:{id: req.user._id, username: req.user.username}}
      }, {new:true}).exec(function (err, followers) {console.log(followers)});
      });

      res.send('OK')
    },
    unfollow: function (req, res) {
      Follow.update({userId: {$in:[req.profile._id, req.user._id]}}, {$pull:{follows:{id: req.profile._id}, followers:{id: req.user._id }}},{new: true, multi:true}, function(err, num){
        res.send(num);
      })
     
  }

   
  };
};
