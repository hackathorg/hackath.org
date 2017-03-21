(function() {
    'use strict';

    function HackathorgLeaderboards($stateProvider) {
        $stateProvider.state('leaderboard', {
            url: '/leaderboard',
            templateUrl: 'hackathorg-leaderboards/views/index.html'
        });
    }

    angular
        .module('mean.hackathorg-leaderboards')
        .config(HackathorgLeaderboards);

    HackathorgLeaderboards.$inject = ['$stateProvider'];

})();
