(function() {
    'use strict';

    function HackathorgEvents($stateProvider) {
        $stateProvider.state('events', {
            url: '/events',
            templateUrl: 'hackathorg-events/views/index.html'
        }).state('discover', {
            parent: 'events',
            templateUrl: 'hackathorg-events/views/part-discover.html'
        }).state('yourevents', {
            parent: 'events',
            templateUrl: 'hackathorg-events/views/part-yourevents.html'
        });
    }

    angular
        .module('mean.hackathorg-events')
        .config(HackathorgEvents);

    HackathorgEvents.$inject = ['$stateProvider'];

})();
