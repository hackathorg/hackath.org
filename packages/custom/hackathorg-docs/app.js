'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var HackathorgDocs = new Module('hackathorg-docs');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
HackathorgDocs.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  HackathorgDocs.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  HackathorgDocs.menus.add({
    title: 'Docs',
    link: 'docs',
    roles: ['authenticated'],
    menu: 'main',
    position: 3
  });
  
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    HackathorgDocs.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    HackathorgDocs.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    HackathorgDocs.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return HackathorgDocs;
});
