(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgDocsController($scope, Global, HackathorgDocs, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-docs'
        };

        $scope.checkCircle = function() {
            HackathorgDocs.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.hackathorg-docs')
        .controller('HackathorgDocsController', HackathorgDocsController);

    HackathorgDocsController.$inject = ['$scope', 'Global', 'HackathorgDocs', '$stateParams'];

})();
