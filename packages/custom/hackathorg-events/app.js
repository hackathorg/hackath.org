'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var HackathorgEvents = new Module('hackathorg-events');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
HackathorgEvents.register(function(app, auth, database, circles) {
  HackathorgEvents.controller = require('./server/controllers/hackathorgEvents') (HackathorgEvents);
  //We enable routing. By default the Package Object is passed to the routes
  HackathorgEvents.routes(app, auth, database, circles);
  
  //We are adding a link to the main menu for all authenticated users
  HackathorgEvents.menus.add({
    title: 'Events',
    link: 'events',
    roles: ['authenticated'],
    menu: 'main',
    position: 1
  });

  HackathorgEvents.menus.add({
    title: 'Create',
    link: 'create',
    roles: ['authenticated'],
    menu: 'main',
    position: 2
  });
  
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    HackathorgEvents.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    HackathorgEvents.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    HackathorgEvents.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return HackathorgEvents;
});
