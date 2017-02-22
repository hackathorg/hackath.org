(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter

    

    module.exports = function(HackathorgEvents, app, auth, database, circles) {
        var passport = require('../passport');
        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var events = HackathorgEvents.controller;
        app.route('/api/events')
            .get(events.all)
            .post(events.create);
        app.route('/api/events/:eventid')
            .get(events.show)
            .put(events.update);
        
        app.get('/api/user/events', requiresLogin, events.userevents);

        app.get('/auth/heroku',
  passport.authenticate('heroku'),
  function(req, res){

        });

        // GET /auth/heroku/callback
        //   Use passport.authenticate() as route middleware to authenticate the
        //   request.  If authentication fails, the user will be redirected back to the
        //   login page.  Otherwise, the primary route function function will be called,
        //   which, in this example, will redirect the user to the home page.
        app.get('/auth/heroku/callback', 
                passport.authenticate('heroku', { failureRedirect: '/login' }),
                function(req, res) {
                res.redirect('/');
        });

        app.get('/api/hackathorgEvents/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

        app.get('/api/hackathorgEvents/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/hackathorgEvents/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/hackathorgEvents/example/render', function(req, res) {
            HackathorgEvents.render('index', {
                package: 'hackathorg-events'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
    };
})();
