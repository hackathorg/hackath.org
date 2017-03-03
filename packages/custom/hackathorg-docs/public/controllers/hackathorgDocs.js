(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgDocsController($scope, Global, HackathorgDocs, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-docs'
        };
        $scope.selectedDocs = 'hackath';
        $scope.selectedTab = 'default';
        // Ideally, in the future grabbing docs would be done from mongo & be extensible for additional docs
        // Due to time constraints it will be done in HTML *sigh*

        $scope.viewDocs = function (selectedDocs) {
           $scope.selectedDocs = selectedDocs;
           $scope.changeTab('default');
        };

        $scope.changeTab = function (selectedTab) { 
           $scope.selectedTab = selectedTab;
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
