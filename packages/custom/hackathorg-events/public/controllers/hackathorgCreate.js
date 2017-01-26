(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgCreateController($scope, Global, $stateParams, EventService, $state) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-events'
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

        $scope.event = new EventService.events()
        $scope.event.tags = []
        $scope.event.hosts = []
        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.minDate = new Date(
              $scope.startDate.getFullYear(),
              $scope.startDate.getMonth(),
              $scope.startDate.getDate());
        $scope.setStartDate = function(){
            $scope.event.startDate = $scope.startDate.toISOString();
        }
        $scope.setEndDate = function(){
            $scope.event.endDate = $scope.endDate.toISOString();
        }
        $scope.submit = function() {
            $scope.event.$save(function() {
                $state.go('events'); 
            });
        };

        $scope.checkCircle = function() {
            EventService.checkCircle($stateParams.circle).then(function(response) {
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
        .controller('HackathorgCreateController', HackathorgCreateController);

    HackathorgCreateController.$inject = ['$scope', 'Global', '$stateParams', 'EventService', '$state'];

})();
