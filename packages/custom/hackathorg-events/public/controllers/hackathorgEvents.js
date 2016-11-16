(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgEventsController($scope, Global, HackathorgEvents, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-events'
        };

        $scope.checkCircle = function() {
            HackathorgEvents.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventsController', HackathorgEventsController);

    HackathorgEventsController.$inject = ['$scope', 'Global', 'HackathorgEvents', '$stateParams'];

})();
