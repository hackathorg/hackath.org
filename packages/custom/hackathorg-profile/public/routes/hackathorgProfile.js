(function() {
    'use strict';

    function HackathorgProfile($stateProvider) {
        $stateProvider.state('hackathorgProfile example page', {
            url: '/hackathorgProfile/example',
            templateUrl: 'hackathorg-profile/views/index.html'
        }).state('hackathorgProfile circles example', {
            url: '/hackathorgProfile/example/:circle',
            templateUrl: 'hackathorg-profile/views/example.html'
        });
    }

    angular
        .module('mean.hackathorg-profile')
        .config(HackathorgProfile);

    HackathorgProfile.$inject = ['$stateProvider'];

})();
