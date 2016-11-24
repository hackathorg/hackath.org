(function() {
    'use strict';

    function HackathorgEvents($stateProvider) {
        $stateProvider.state('hackathorgEvents', {
            url: '/hackathorgEvents',
            templateUrl: 'hackathorg-events/views/index.html'
        }).state('discover', {
            parent: 'hackathorgEvents',
            templateUrl: 'hackathorg-events/views/part-discover.html'
        }).state('yourevents', {
            parent: 'hackathorgEvents',
            template: 'hackathorg-events/views/part-yourevents.html'
        });
    }

    angular
        .module('mean.hackathorg-events')
        .config(HackathorgEvents);

    HackathorgEvents.$inject = ['$stateProvider'];

})();
