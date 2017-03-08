(function() {
    'use strict';

    function HackathorgEvents($stateProvider) {
        $stateProvider.state('create', {
            url: '/create',
            templateUrl: 'hackathorg-events/views/create.html'
        });
        $stateProvider.state('events', {
            url: '/events',
            templateUrl: 'hackathorg-events/views/index.html'
        }).state('events eventid', {
            url: '/events/:eventid',
            templateUrl: 'hackathorg-events/views/viewevent.html'
        });
        $stateProvider.state('hosted', {
            url: '/hosted',
            templateUrl: 'hackathorg-events/views/hosted.html'
        }).state('hosted eventid', {
            url: '/hosted/:eventid',
            templateUrl: 'hackathorg-events/views/hosted.html'
        });
    }

    angular
        .module('mean.hackathorg-events')
        .config(HackathorgEvents);

    HackathorgEvents.$inject = ['$stateProvider'];

})();
