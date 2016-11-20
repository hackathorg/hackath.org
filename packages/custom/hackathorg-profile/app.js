'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var HackathorgProfile = new Module('hackathorg-profile');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
HackathorgProfile.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  HackathorgProfile.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  HackathorgProfile.menus.add({
    title: 'Profile',
    link: 'hackathorgProfile example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    HackathorgProfile.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    HackathorgProfile.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    HackathorgProfile.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return HackathorgProfile;
});
