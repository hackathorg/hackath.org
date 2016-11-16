(function() {
    'use strict';

    function HackathorgEvents($stateProvider) {
        $stateProvider.state('hackathorgEvents example page', {
            url: '/hackathorgEvents/example',
            templateUrl: 'hackathorg-events/views/index.html'
        }).state('hackathorgEvents circles example', {
            url: '/hackathorgEvents/example/:circle',
            templateUrl: 'hackathorg-events/views/example.html'
        });
    }

    angular
        .module('mean.hackathorg-events')
        .config(HackathorgEvents);

    HackathorgEvents.$inject = ['$stateProvider'];

})();
