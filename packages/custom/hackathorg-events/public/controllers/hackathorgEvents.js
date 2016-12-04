(function() {
    'use strict';
    var mongoose = require('mongoose')
    /* jshint -W098 */

    function HackathorgEventsController($scope, Global, EventService, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-events'
        };

        $scope.user = {
            'id' : '1'
        };

        $scope.discover = {
            'recommended' : true,
            'tickets' : true,
            'size' : 'All',
            'skill' : 'All'
        };

        $scope.yourevents = {
            'attendee' : true, 
            'mentor' : false,
            'host' : false, 
            'historical' : false
        };

        $scope.skills = [{
           'type': 'All'
        }, {
           'type': 'Beginner'
        }, {
           'type': 'Intermediate'
        }, {
            'type': 'Advanced'
        }];

        $scope.sizes = [{
           'type': 'All'
        }, {
           'type': 'Small'
        }, {
           'type': 'Medium'
        }, {
            'type': 'Large'
        }];

        EventService.events.all(function (events) {
            $scope.sites = events;
        });
        $scope.sites = EventService.events.all();
       $scope.currentNavItem = 'discover';
       
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

    HackathorgEventsController.$inject = ['$scope', 'Global', 'EventService', '$stateParams'];

})();
