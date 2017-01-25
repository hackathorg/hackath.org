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
        });
    }

    angular
        .module('mean.hackathorg-events')
        .config(HackathorgEvents);

    HackathorgEvents.$inject = ['$stateProvider'];

})();
