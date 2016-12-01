(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgCreateController($scope, Global, HackathorgCreate, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-create'
        };

        $scope.checkCircle = function() {
            HackathorgCreate.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.hackathorg-create')
        .controller('HackathorgCreateController', HackathorgCreateController);

    HackathorgCreateController.$inject = ['$scope', 'Global', 'HackathorgCreate', '$stateParams'];

})();
