(function() {
    'use strict';
    var mongoose = require('mongoose')
    /* jshint -W098 */

    function HackathorgEventsController($scope, Global, EventService, $stateParams) {
        $scope.global = Global;

        $scope.package = {
            name: 'hackathorg-events'
        };

        $scope.user = {
            'id' : '1'
        };

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

        $scope.skills = [{
           'type': 'All'
        }, {
           'type': 'Beginner'
        }, {
           'type': 'Intermediate'
        }, {
            'type': 'Advanced'
        }];

        $scope.sizes = [{
           'type': 'All'
        }, {
           'type': 'Small'
        }, {
           'type': 'Medium'
        }, {
            'type': 'Large'
        }];

        $scope.events = EventService.events.all();
        $scope.sites = $scope.events;
        $scope.currentNavItem = 'discover';

        $scope.currentNavItem = '';

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
                    console.error('Unimplemented')
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
                    console.error('Unimplemented')
                }
                if ($scope.discover.historical) {
                    console.error('Unimplemented')
                }
                if ($scope.discover.current) {
                    console.error('Unimplemented')
                }
                if ($scope.discover.historical) {
                    console.error('Unimplemented')
                }
                if ($scope.discover.prizes) {
                    // check prizes = true
                    console.error('Unimplemented')
                }
                if ($scope.discover.tickets) {
                    // check attendees < max size
                    console.error('Unimplemented')
                }
                return true
            }
        };
    
    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventsController', HackathorgEventsController);

    HackathorgEventsController.$inject = ['$scope', 'Global', 'EventService', '$stateParams'];

})();
