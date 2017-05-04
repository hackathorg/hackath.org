(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(HackathorgProfile, app, auth, database, circles) {

        var requiresLogin = circles.controller.hasCircle('authenticated');
        var profiles = HackathorgProfile.controller;
        app.param('applicationId', profiles.getUserEvents);

        //Profile
        app.get('/api/users', requiresLogin, function (req, res) {res.send(req.user); });
        app.get('/api/users/:userId', function(req, res){res.send(req.profile); });
        app.post('/api/profile/update', requiresLogin, profiles.updateProfile)

        //Followers
        app.get('/api/followers', requiresLogin, profiles.followers);
        app.get('/api/follows', requiresLogin, profiles.follows);
        app.get('/api/followers/:userId', profiles.followers);
        app.get('/api/follows/:userId', profiles.follows);
        app.get('/api/followerstats/:userId', profiles.counts);
        app.post('/api/follow/:userId', requiresLogin, profiles.follow);
        app.post('/api/unfollow/:userId', requiresLogin, profiles.unfollow);

        //Applications
        app.get('/api/events/:eventid/applications', requiresLogin, profiles.eventapplications);
        app.get('/api/user/applications', requiresLogin, profiles.userapplications);
        app.post('/api/events/:eventid/apply', requiresLogin, profiles.apply);
        app.post('/api/events/:eventid/cancel', requiresLogin, profiles.cancelTicket);
        app.post('/api/applications/:applicationId/cancel', requiresLogin, profiles.cancelApplication);
        app.post('/api/applications/:applicationId/review', requiresLogin, profiles.review);
        // app.get('/api/applications/:applicationId', requiresLogin, profiles.application);


    };
}());