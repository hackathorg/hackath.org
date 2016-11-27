(function() {
    'use strict';

    function HackathorgEvents($stateProvider) {
        $stateProvider.state('events', {
            abstract: true,
            url: '/events',
            templateUrl: 'hackathorg-events/views/index.html'
        }).state('events.discover', {
            url: '',
            parent: 'events',
            templateUrl: 'hackathorg-events/views/part-discover.html',
            controller: function($scope) {
                $scope.currentNavItem = 'discover';
            }
        }).state('events.yourevents', {
            url: '',
            parent: 'events',
            templateUrl: 'hackathorg-events/views/part-yourevents.html',
            controller: function($scope) {
                $scope.currentNavItem = 'yourevents';
            }
        }).state('events.createevent', {
            url: '',
            parent: 'events',
            templateUrl: 'hackathorg-events/views/part-createevent.html',
            controller: function($scope) {
                $scope.currentNavItem = 'createevent';
            }
        });
    }

    angular
        .module('mean.hackathorg-events')
        .config(HackathorgEvents);

    HackathorgEvents.$inject = ['$stateProvider'];

})();
