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

        $scope.application = EventService.applications;
        $scope.application.eventId = $scope.getEventId
        $scope.application.role = 'Attendee'

        $scope.previousApplication = false;
        $scope.applied = {}

        function updateApplications() {
            var usersapplications = EventService.applications.user(function(applications) {
                for (var i = 0; i < usersapplications.length; i++) {
                    if ($scope.getEventId === usersapplications[i].eventId){
                        $scope.applied = usersapplications[i]
                        $scope.previousApplication = true;
                    }
                }
            });
        };

        updateApplications();

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
                updateApplications();
                //show a thank you message
            });
        };

    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventViewController', HackathorgEventViewController);

    HackathorgEventViewController.$inject = ['$scope', 'Global', 'EventService', '$stateParams'];

})();
