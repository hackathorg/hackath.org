(function() {
    'use strict';

    function HackathorgProfile($stateProvider) {
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'hackathorg-profile/views/index.html'
        }).state('profile settings', {
            url: '/profile/settings',
            templateUrl: 'hackathorg-profile/views/index.html',
            controller: function($scope){
                $scope.overrideTab = 'settings';
            }
        }).state('profile username', {
            url: '/profile/:username',
            templateUrl: 'hackathorg-profile/views/index.html'
        });
    }

    angular
        .module('mean.hackathorg-profile')
        .config(HackathorgProfile);

    HackathorgProfile.$inject = ['$stateProvider'];

}());
