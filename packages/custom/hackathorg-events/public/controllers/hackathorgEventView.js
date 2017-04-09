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

        // var applicationSchema = new Schema({
        //     userId:{type: ObjectId, index: true},
        //     eventId:{type: ObjectId, index: true},
        //     username: String,
        //     role: String,
        //     description: String,
        //     site: String,
        //     contact: String,
        //     proposal: String,
        //     status: String,
        //     response: String
        // });
        $scope.application = EventService.eventapplications;
        console.error($scope.application)
        $scope.application.eventId = $scope.getEventId
        $scope.application.role = 'Attendee'
        
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

        $scope.submit = function() {
            $scope.application.apply({eventId:$scope.getEventId}, function(application) {
                //$scope.events.push({_id:event._id, title:event.title, organisation: event.organisation})
                //show a thank you message

            });
        };

    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventViewController', HackathorgEventViewController);

    HackathorgEventViewController.$inject = ['$scope', 'Global', 'EventService', '$stateParams'];

})();
