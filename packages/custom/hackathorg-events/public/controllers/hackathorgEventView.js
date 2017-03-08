(function() {
    'use strict';
    var mongoose = require('mongoose')
    /* jshint -W098 */

    function HackathorgEventViewController($scope, Global, EventService, $stateParams) {
        $scope.global = Global;

        $scope.package = {
            name: 'hackathorg-events'
        };

        /* Event information */
        $scope.getEventId = $stateParams.eventid;
        $scope.event = EventService.events.show({name:$scope.getEventId})

        $scope.sites = $scope.events;
        $scope.currentNavItem = 'discover';

        $scope.currentNavItem = '';

        var containsId = function(array, id) {
            return array.some(function(arrVal) {
                return id === arrVal.id
            })
        };

        /* Attendee types */

        $scope.viewattendee = 'Organiser';
        $scope.applyattendee = 'Attendee';
        
        $scope.viewattendeetype = [{
            'type' :'Organiser' 
        }, {
            'type' :'Mentor' 
        }, {
            'type' :'Attendee' 
        }];

        $scope.applyattendeetype = [{
            'type' :'Attendee' 
        }, {
            'type' :'Mentor' 
        }, {
            'type' :'Sponsor' 
        }];

    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventViewController', HackathorgEventViewController);

    HackathorgEventViewController.$inject = ['$scope', 'Global', 'EventService', '$stateParams'];

})();
