'use strict';

var passport = require('passport');
var HerokuStrategy = require('passport-heroku').Strategy;
var jwt = require('jsonwebtoken')
var config = require('meanio').getConfig();
var mongoose = require('mongoose'),
    Event = mongoose.model('Event');

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user object based on a pre-serialized token
  // which is the user id
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashed_password', function(err, user) {
      done(err, user);
    });
  });

passport.use(new HerokuStrategy(
{
    clientID: process.env.heroku_client_id,
    clientSecret: process.env.heroku_client_secret,
    callbackURL: 'https://localhost:3000/api/auth/heroku/callback',
    passReqToCallback: true,
    session: false
    
},

function(request, accessToken, refreshToken, profile, done) {
  Event.findOneAndUpdate({_id:mongoose.Types.ObjectId(jwt.verify(request.query.state, config.secret).state)},
                        {$set: {heroku: {apiKey: accessToken, refreshToken: refreshToken}}},
                        function (err, event) {
              if (err) {
                console.log(err)
              }
              console.log(event)
            });
  done(null, profile);
}));

module.exports = passport;