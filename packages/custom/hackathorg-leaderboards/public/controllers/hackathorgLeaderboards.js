(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgLeaderboardsController($scope, Global, HackathorgLeaderboards, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-leaderboards'
        };

        $scope.checkCircle = function() {
            HackathorgLeaderboards.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.hackathorg-leaderboards')
        .controller('HackathorgLeaderboardsController', HackathorgLeaderboardsController);

    HackathorgLeaderboardsController.$inject = ['$scope', 'Global', 'HackathorgLeaderboards', '$stateParams'];

})();
