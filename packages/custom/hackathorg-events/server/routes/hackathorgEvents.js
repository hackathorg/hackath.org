(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter

    

    module.exports = function(HackathorgEvents, app, auth, database, circles) {
        var passport = require('../../passport');
        var jwt = require('jsonwebtoken');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var events = HackathorgEvents.controller;
        var config = require('meanio').getConfig();
        app.use(passport.initialize());
        app.route('/api/events')
            .get(events.all)
            .post(events.create);
        app.route('/api/events/:eventid')
            .get(events.show)
            .put(events.update);
        
        app.get('/api/user/events/hosted', requiresLogin, events.userevents);
        app.post('/api/heroku/create/:eventid', requiresLogin, events.heroku.create);
        //app.get('/api/heroku/status/:eventid', requiresLogin, events.heroku.status);
        app.route('/api/heroku/maintenance/:eventid')
            .get(requiresLogin, events.heroku.maintenance)
            .post(requiresLogin, events.heroku.setMaintenance);
        app.post('/api/heroku/rebuild/:eventid', requiresLogin, events.heroku.rebuild);

        app.get('/api/auth/heroku/:eventid',  function(req,res,next){ 
            var state = jwt.sign({state:req.params.eventid}, config.secret,{expiresIn: '1h'})
            passport.authenticate('heroku',{state: state})(req, res, next)},  function(req, res){
           
        });


        app.get('/api/auth/heroku/callback',  
            passport.authenticate('heroku', { failureRedirect: '/login' }),
            function(req, res) {
                res.redirect('/');
            }
        );
    };
}());
