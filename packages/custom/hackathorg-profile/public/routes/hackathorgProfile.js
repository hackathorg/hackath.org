(function() {
    'use strict';

    function HackathorgProfile($stateProvider) {
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'hackathorg-profile/views/index.html'
        });
    }

    angular
        .module('mean.hackathorg-profile')
        .config(HackathorgProfile);

    HackathorgProfile.$inject = ['$stateProvider'];

})();
