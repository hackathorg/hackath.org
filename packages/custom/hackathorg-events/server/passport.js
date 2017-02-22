'use strict';

var passport = require('passport');
var HerokuStrategy = require('passport-heroku').Strategy;
var mongoose = require('mongoose'),
    Event = mongoose.model('Event');
    
var herokuPassport = passport.use(new HerokuStrategy(
{
    clientID: '3955d5e8-0174-4585-93ad-5324429986be',
    clientSecret: '732e75b7-bb48-4180-95bb-e21a1314497a',
    callbackURL: 'https://hackath.org/auth/heroku/callback',
    passReqToCallback: true
},

function(request, accessToken, refreshToken, profile, done) {

  console.log('bob')
  console.log('bob')
  console.log('state: ' + request.query.state);
  console.log('bob')
  console.log('bob')
  Event.findOneAndUpdate({_id:request.state})
  login(profile, done);
}));

module.exports = herokuPassport;