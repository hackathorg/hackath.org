(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(HackathorgLeaderboards, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/hackathorgLeaderboards/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

        app.get('/api/hackathorgLeaderboards/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/hackathorgLeaderboards/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/hackathorgLeaderboards/example/render', function(req, res) {
            HackathorgLeaderboards.render('index', {
                package: 'hackathorg-leaderboards'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
    };
})();
