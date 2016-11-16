(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(HackathorgProfile, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

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
