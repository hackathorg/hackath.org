(function() {
    'use strict';
    var mongoose = require('mongoose')
    /* jshint -W098 */

    function HackathorgHostedController($scope, Global, EventService, $stateParams) {
        $scope.global = Global;

        $scope.package = {
            name: 'hackathorg-events'
        };

        $scope.user = {
            'id' : '1'
        };

        $scope.idSelectedEvent = null;

        // Selected Event information
          // $scope.event.title:  {type: String, unique: true},
          // description: String,
          // organisation: String,
          // startDate: Date,
          // logo: String,
          // image:String,
          // url:   String,
          // ownerid: ObjectId,
          // hosts:[String], 
          // tags:[String],
          // comments: [{ body: String, date: Date }],
          // date: { type: Date, default: Date.now },
          // hidden: Boolean,
          // maxAttendees: Number,
          // maxMentors: Number,
          // location: String,
          // sponsors: Boolean,
          // skillLevel: String,
          // mentors:[ObjectId],
          // attendees:[ObjectId]
        // Create an Event information (this is seperate to keep event creation persistent if you change event)

        $scope.setSelected = function (idSelectedEvent) {
           $scope.idSelectedEvent = idSelectedEvent;
           // Populate the page with Creating an event shtuff
           if (idSelectedEvent === null) {

           } 
           // Get the event selected from db and populate page with Update event shtuff
           else {
                $scope.event = EventService.events.show({name:idSelectedEvent})
           }
        };

        // FROM CREATE EVENT
        $scope.eventTags = ['jamesmahoney200@hotmail.com', 'mike_380@live.co.uk'];
        $scope.readonly = false;
        $scope.attendees;
        $scope.mentors;

        $scope.skills = [{
           'type': 'All'
        }, {
           'type': 'Beginner & above'
        }, {
           'type': 'Intermediate & above'
        }, {
            'type': 'Advanced'
        }];

        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.minDate = new Date(
              $scope.startDate.getFullYear(),
              $scope.startDate.getMonth(),
              $scope.startDate.getDate());

        $scope.discover = {
            'recommended' : true,
            'tickets' : true,
            'size' : 'All',
            'skill' : 'All'
        };

        $scope.yourevents = {
            'attendee' : true, 
            'mentor' : false,
            'host' : false, 
            'historical' : false
        };

        $scope.sizes = [{
           'type': 'All'
        }, {
           'type': 'Small'
        }, {
           'type': 'Medium'
        }, {
            'type': 'Large'
        }];

        $scope.events = EventService.events.userevents();
        $scope.sites = $scope.events;

        $scope.checkCircle = function() {
            EventService.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

        var containsId = function(array, id) {
            return array.some(function(arrVal) {
                return id === arrVal.id
            })
        };

        $scope.bestMatch = function(a) {
            var userid = $scope.user.id;

            // find closest search
            if ($scope.discover.search) {
                // TO IMPLEMENT
                if (((a.title.toLowerCase()).indexOf(($scope.discover.search).toLowerCase())) === -1) {
                    console.error(a.title + ' unmatched')
                    return false
                }
            } 
            // implement a recommended system
            
        };

        $scope.filterEvents = function(a) {
            var userid = $scope.user.id;

            // search
            if ($scope.discover.search) {
                // TODO implement a better search
                if (((a.title.toLowerCase()).indexOf(($scope.discover.search).toLowerCase())) === -1) {
                    console.error(a.title + ' unmatched')
                    return false
                }
            } 

            // YourEvent filtering
            if ($scope.discover.yourevents) {
                if ($scope.discover.attendee) {
                    if (!containsId(a.attendees, userid)) {
                        return false
                    }
                } else if ($scope.discover.host) {
                    if (!containsId(a.hosts, userid)) {
                        return false
                    }
                } else if ($scope.discover.mentor) {
                    if (!containsId(a.mentors, userid)) {
                        return false
                    }
                } else if ($scope.discover.sponsor) {
                    //to be implemented
                } else {
                    // yourevents ticked, but not specified 
                    // add sponsor check
                    if (!containsId(a.mentors, userid) && !containsId(a.hosts, userid) && !containsId(a.attendees, userid)) {
                        return false
                    }
                }
            }

            // other misc filters
            if ($scope.discover.recommended) {
                // check if event is recommended
                return true
            } else {
                //add new filters here
                if ($scope.discover.virtual) {
                    return false
                }
                if ($scope.discover.nearby) {
                    
                }
                if ($scope.discover.historical) {
                    
                }
                if ($scope.discover.current) {
                    
                }
                if ($scope.discover.historical) {
                    
                }
                if ($scope.discover.prizes) {
                    // check prizes = true
                }
                if ($scope.discover.tickets) {
                    // check attendees < max size
                }
                return true
            }
        };
    
    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgHostedController', HackathorgHostedController);

    HackathorgHostedController.$inject = ['$scope', 'Global', 'EventService', '$stateParams'];

})();
