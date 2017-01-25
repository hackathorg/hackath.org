(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgCreateController($scope, Global, HackathorgCreate, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-create'
        };

        $scope.eventTags = ['jamesmahoney200@hotmail.com', 'mike_380@live.co.uk'];
        $scope.readonly = false;
        $scope.attendees;
        $scope.mentors;

        $scope.skills = [{
           'type': 'All'
        }, {
           'type': 'Beginner & above'
        }, {
           'type': 'Intermediate & above'
        }, {
            'type': 'Advanced'
        }];

        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.minDate = new Date(
              $scope.startDate.getFullYear(),
              $scope.startDate.getMonth(),
              $scope.startDate.getDate());

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
