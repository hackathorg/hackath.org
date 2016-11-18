(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(HackathorgDocs, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

            res.send('Anyone can access this');
        });

            res.send('Only authenticated users can access this');
        });

            res.send('Only users with Admin role can access this');
        });

            HackathorgDocs.render('index', {
                package: 'hackathorg-docs'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
    };
})();
