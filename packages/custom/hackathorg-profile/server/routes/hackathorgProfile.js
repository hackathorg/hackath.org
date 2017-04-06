(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(HackathorgProfile, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var profiles = HackathorgProfile.controller
        console.log(profiles)
        app.get('/api/users', requiresLogin, function (req, res) {res.send(req.user)})
        app.get('/api/users/:userId', function(req, res){res.send( req.profile)})

        //Followers
        app.get('/api/followers', requiresLogin, profiles.followers)
        app.get('/api/follows', requiresLogin, profiles.follows)
        app.get('/api/followers/:userId', profiles.followers)
        app.get('/api/follows/:userId', profiles.follows)
        app.get('/api/followerstats/:userId', profiles.counts)
        app.post('/api/follow/:userId', requiresLogin, profiles.follow)
        app.post('/api/unfollow/:userId', requiresLogin, profiles.unfollow)

        //Applications
        app.get('/api/event/:eventId/applications', requiresLogin, profiles.eventapplications)
        app.get('/api/user/applications', requiresLogin, profiles.userapplications)
        app.post('/api/events/apply/:eventid', requiresLogin, profiles.apply)
        app.post('/api/applications/:applicationId', requiresLogin, profiles.review)

        app.get('/api/hackathorgProfile/example/anyone', function(req, res) {
            res.send('Anyone can access this');
            
        });
        
        app.get('/api/hackathorgProfile/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/hackathorgProfile/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/hackathorgProfile/example/render', function(req, res) {
            HackathorgProfile.render('index', {
                package: 'hackathorg-profile'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
    };
})();
