(function() {
    'use strict';

    function HackathorgLeaderboards($stateProvider) {
        $stateProvider.state('hackathorgLeaderboards example page', {
            url: '/hackathorgLeaderboards/example',
            templateUrl: 'hackathorg-leaderboards/views/index.html'
        }).state('hackathorgLeaderboards circles example', {
            url: '/hackathorgLeaderboards/example/:circle',
            templateUrl: 'hackathorg-leaderboards/views/example.html'
        });
    }

    angular
        .module('mean.hackathorg-leaderboards')
        .config(HackathorgLeaderboards);

    HackathorgLeaderboards.$inject = ['$stateProvider'];

})();
