(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgEventsController($scope, Global, HackathorgEvents, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-events'
        };

        $scope.data = {
            'recommended' : true,
            'tickets' : true,
            'size' : 'All',
            'skill' : 'All'
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
          'name': 'WarwickHACK',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'Warwick University',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png'
        }, {
          'name': 'WarwickHACK',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'Warwick University',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png'
        }, {
          'name': 'WarwickHACK',
          'text': 'WarwickHACK is a hackathon event where programmers, entrepreneurs, designers and developers come together to build, make and create. The event is a classic hackathon, where you have 24 hours to go crazy with your ideas!',
          'author': 'Warwick University',
          'link': 'http://www.warwick.tech',
          'image': '/meanStarter/assets/img/placeholder.png'
        }];

        $scope.currentNavItem = 'discover';

        $scope.checkCircle = function() {
            HackathorgEvents.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventsController', HackathorgEventsController);

    HackathorgEventsController.$inject = ['$scope', 'Global', 'HackathorgEvents', '$stateParams'];

})();
