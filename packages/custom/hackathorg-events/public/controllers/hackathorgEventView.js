(function() {
    'use strict';
    /* jshint -W098 */

    function HackathorgEventViewController($scope, Global, EventService, $stateParams, MeanUser, $rootScope) {
        $scope.global = Global;

        $scope.package = {
            name: 'hackathorg-events'
        };

        // User stuff
        var vm = this;
        vm.hdrvars = {      
          authenticated: MeanUser.loggedin,
          user: MeanUser.user,
          isAdmin: MeanUser.isAdmin
        }

        $rootScope.$on('loggedin', function () {

            vm.hdrvars = {
                authenticated: MeanUser.loggedin,
                user: MeanUser.user,
                isAdmin: MeanUser.isAdmin
            }
            $scope.event = EventService.events.show({name:$scope.getEventId}, function() {
                isAttending();
            });
        });

        /* Event information */
        $scope.getEventId = $stateParams.eventid;
        $scope.event = EventService.events.show({name:$scope.getEventId});

        $scope.sites = $scope.events;
        $scope.currentNavItem = 'discover';

        $scope.currentNavItem = '';

        

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

        $scope.application = new EventService.eventapplications();
        $scope.application.eventId = $scope.getEventId;
        $scope.application.role = 'Attendee';

        $scope.previousApplication = false;
        $scope.applied = {};

        function updateApplications() {
            var usersapplications = EventService.applications.user(function(applications) {
                for (var i = 0; i < usersapplications.length; i++) {
                    if ($scope.getEventId === usersapplications[i].eventId){
                        $scope.applied = usersapplications[i];
                        $scope.previousApplication = true;
                    }
                }
                return false
            });
        }

        updateApplications();

        // Attendee filtering

        $scope.attendingAs = null;

        function isAttending () {
            for(var i = 0; i < $scope.event.users.length; i++){
                if ($scope.event.users[i].userId === vm.hdrvars.user._id) {
                    $scope.attendingAs = $scope.event.users[i].role
                    return true
                }
            }
            return false
        };

        $scope.attendeetype = 'attendee';

        $scope.attendeetypes = [{
            'type' :'Attending',
            'value' : 'attendee'
        }, {
            'type' :'Organising',
            'value' : 'organiser' 
        }, {
            'type' :'Mentoring',
            'value' : 'mentor'  
        }];

        $scope.applyattendeetype = [{
            'type' :'Attendee' 
        }, {
            'type' :'Mentor' 
        }, {
            'type' :'Sponsor' 
        }];

        $scope.submit = function() {
            
            $scope.application.$apply({eventId:$scope.getEventId}, function(application) {
                updateApplications();
                //show a thank you message
            });
        };

        $scope.cancel = function() {
            
            $scope.application.$cancel({eventId:$scope.getEventId}, function() {
                updateApplications();
                //show a thank you message
            });
        };
    }

    angular
        .module('mean.hackathorg-events')
        .controller('HackathorgEventViewController', HackathorgEventViewController);

    HackathorgEventViewController.$inject = ['$scope', 'Global', 'EventService', '$stateParams', 'MeanUser', '$rootScope'];

})();
