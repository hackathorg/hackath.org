(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgProfileController($scope, Global, HackathorgProfile, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-profile'
        };

        $scope.checkCircle = function() {
            HackathorgProfile.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.hackathorg-profile')
        .controller('HackathorgProfileController', HackathorgProfileController);

    HackathorgProfileController.$inject = ['$scope', 'Global', 'HackathorgProfile', '$stateParams'];

})();
