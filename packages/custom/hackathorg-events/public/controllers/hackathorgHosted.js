(function() {
    'use strict';
    var mongoose = require('mongoose')
    /* jshint -W098 */

    function HackathorgHostedController($scope, Global, $stateParams, EventService, $state) {
        $scope.global = Global;

        $scope.package = {
            name: 'hackathorg-events'
        };

        $scope.user = {
            'id' : '1'
        };

        $scope.idSelectedEvent = null;
        $scope.newevent = {};
        $scope.newevent.hosts = ["test"];
        $scope.newevent.tags = [];
        $scope.event = new EventService.events()
        $scope.event.hosts = ["test"];
        $scope.event.tags = [];

        // Event schema
        // $scope.event.title:  {type: String, unique: true},
        // description: String,
        // organisation: String,
        // startDate: Date,
        // logo: String,
        // image:String,
        // url:   String,
        // ownerid: ObjectId,
        // hosts:[String], 
        // tags:[String],
        // comments: [{ body: String, date: Date }],
        // date: { type: Date, default: Date.now },
        // hidden: Boolean,
        // maxAttendees: Number,
        // maxMentors: Number,
        // location: String,
        // sponsors: Boolean,
        // skillLevel: String,
        // mentors:[ObjectId],
        // attendees:[ObjectId]

        $scope.setSelected = function (idSelectedEvent) {

           // If changing state from Create, save the info
           if ($scope.idSelectedEvent === null) {
                $scope.newevent = $scope.event
           }

           // Change State
           $scope.idSelectedEvent = idSelectedEvent;

           // Populate the page with Creating an event shtuff
           if (idSelectedEvent === null) {
                $scope.event = $scope.newevent
           } 
           // Get the event selected from db and populate page with Update event shtuff
           else {
                $scope.event = EventService.events.show({name:idSelectedEvent})
           }
        };

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

        $scope.events = EventService.events.userevents();
        $scope.sites = $scope.events;

        $scope.checkCircle = function() {
            EventService.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

        $scope.submit = function() {
            $scope.event.$save(function() {
                $state.go('events'); 
            });
        };

        var containsId = function(array, id) {
            return array.some(function(arrVal) {
                return id === arrVal.id
            })
        };
    
    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgHostedController', HackathorgHostedController);

    HackathorgHostedController.$inject = ['$scope', 'Global', '$stateParams', 'EventService', '$state'];

})();
