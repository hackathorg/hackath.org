(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgEventsController($scope, Global, HackathorgEvents, $stateParams) {
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

        $scope.events = [{
          'name': 'WarwickHACKA',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'Warwick University',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png',
          'ownerid' : {'id' : '1'}, 
          'hosts' : [
                {'id':'1'},
                {'id':'2'},
                {'id':'3'},
            ],
          'mentors' : [
                {'id' : '2'}
            ],
          'attendees' : [
                {'id':'1'},
                {'id':'2'},
                {'id':'3'},
            ]
        }, {
          'name': 'WarwickHACKB',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'Warwick University',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png',
          'ownerid' : {'id' : '2'}, 
          'hosts' : [
                {'id':'2'},
                {'id':'3'},
            ],
          'mentors' : [
                {'id' : '3'}
            ],
          'attendees' : [
                {'id':'2'},
                {'id':'3'},
            ]
        }, {
          'name': 'WarwickHACKC',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'WarwickTECH',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png',
          'ownerid' : {'id' : '3'}, 
          'hosts' : [
                {'id':'1'},
                {'id':'3'},
            ],
          'mentors' : [
                {'id' : '1'}
            ],
          'attendees' : [
                {'id':'1'},
                {'id':'2'},
                {'id':'3'},
            ]
        },{
          'name': 'WarwickHACKA',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'Warwick University',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png',
          'ownerid' : {'id' : '1'}, 
          'hosts' : [
                {'id':'1'},
                {'id':'2'},
                {'id':'3'},
            ],
          'mentors' : [
                {'id' : '2'}
            ],
          'attendees' : [
                {'id':'1'},
                {'id':'2'},
                {'id':'3'},
            ]
        }, {
          'name': 'WarwickHACKB',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'Warwick University',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png',
          'ownerid' : {'id' : '2'}, 
          'hosts' : [
                {'id':'2'},
                {'id':'3'},
            ],
          'mentors' : [
                {'id' : '3'}
            ],
          'attendees' : [
                {'id':'2'},
                {'id':'3'},
            ]
        }, {
          'name': 'WarwickHACKC',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'WarwickTECH',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png',
          'ownerid' : {'id' : '3'}, 
          'hosts' : [
                {'id':'1'},
                {'id':'3'},
            ],
          'mentors' : [
                {'id' : '1'}
            ],
          'attendees' : [
                {'id':'1'},
                {'id':'2'},
                {'id':'3'},
            ]
        }];

        $scope.currentNavItem = '';

        $scope.checkCircle = function() {
            HackathorgEvents.checkCircle($stateParams.circle).then(function(response) {
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
                if (((a.name.toLowerCase()).indexOf(($scope.discover.search).toLowerCase())) === -1) {
                    console.error(a.name + ' unmatched')
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
                if (((a.name.toLowerCase()).indexOf(($scope.discover.search).toLowerCase())) === -1) {
                    console.error(a.name + ' unmatched')
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
        .controller('HackathorgEventsController', HackathorgEventsController);

    HackathorgEventsController.$inject = ['$scope', 'Global', 'HackathorgEvents', '$stateParams'];

})();
