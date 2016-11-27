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

        $scope.sites = [{
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
 
        $scope.filterYourEvents = function(a) {
            for(var filter in $scope.yourevents){
                console.error(filter + $scope.user['id'])
                if($scope.yourevents[filter] === true ){ //the filter on cause a problem, return false
                    return false;
                }
            }
            return true;
        };
    
    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventsController', HackathorgEventsController);

    HackathorgEventsController.$inject = ['$scope', 'Global', 'HackathorgEvents', '$stateParams'];

})();
