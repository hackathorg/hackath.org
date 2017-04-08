(function() {
    'use strict';
    var mongoose = require('mongoose')
    //var herokuPassport = require('../../passport')
    /* jshint -W098 */

    function HackathorgHostedController($scope, Global, $stateParams, EventService, $state, $mdDialog, $filter) {
        $scope.global = Global;

        $scope.package = {
            name: 'hackathorg-events'
        };
        
        $scope.getEventId = $stateParams.eventid;

        $scope.user = {
            'id' : '1'
        };

        // This will be maintained in a package database which can be added to 
        $scope.hackages = [{
            'id' : '0',
            'name' : 'Prizes',
            'desc' : 'Information about the prizes module',
            'git' : 'http://github.com/hackathorg/prizes'
        }, {
            'id' : '1',
            'name' : 'Mentor chat',
            'desc' : 'Information about the mentor chat module',
            'git' : 'http://github.com/hackathorg/prizes'
        }, {
            'id' : '2',
            'name' : 'Coding challenges',
            'desc' : 'Information about the coding challenges module',
            'git' : 'http://github.com/hackathorg/prizes'
        }, {
            'id' : '3',
            'name' : 'Pizza',
            'desc' : 'Information about the pizza module',
            'git' : 'http://github.com/hackathorg/prizes'
        }];

        // This will be maintained on Mongo and associated with an event & a user
        $scope.mentorApplications = [{
            'user_id' : '0',
            'event_id' : '0',
            'name' : 'Michael Holtom',
            'desc' : 'Experienced MEAN developer pursuing a MEng in Computer Science',
            'role' : 'Mentoring',
            'site' : 'http://mikeswebsite.com/'
        }, {
            'user_id' : '1',
            'event_id' : '2',
            'name' : 'Jamie Mahoney',
            'desc' : 'Experienced MEAN developer pursuing a MEng in Computer Science',
            'role' : 'General Help',
            'site' : 'http://jamiessite.com/'
        }, {
            'user_id' : '0',
            'event_id' : '0',
            'name' : 'John Jones',
            'desc' : 'Experienced MEAN developer pursuing a BSc in Computer Science',
            'role' : 'General Help',
            'site' : 'http://johnssite.com/'
        }];

        $scope.sponsorApplications = [{
            'user_id' : '0',
            'event_id' : '0',
            'name' : 'hackath.org',
            'desc' : 'Small team of developers looking to sponsor a hackathon.',
            'proposal' : 'https://someproposaldocument.com/ or website',
            'site' : 'http://mikeswebsite.com/',
            'contact' : 'companyemail@company.com'
        }];

        // This will be the heroku server associated with an event
        $scope.heroku = {
            'status' : 'offline',
            'authenticated' : true,
            'req_rebuild' : true,
            'api_key' : 'tbc_s0m3_K3y39481',
            'site' : 'https://yourwebapp.com/',
            'other_field' : '',
            'current_build_hackages' : [{
                'id' : '0'
            }, {
                'id' : '1'
            }],
            'added_hackages' : [{
                'id' : '2'
            }, {
                'id' : '3'
            }],
            'removed_hackages' : [{
                'id' : '1'
            }]

        };

        $scope.attendeetype = 'Attending';

        $scope.attendeetypes = [{
            'type' :'Attending' 
        }, {
            'type' :'Organising' 
        }, {
            'type' :'Mentoring' 
        }];


        $scope.contact = {
            'attendees' : true,
            'mentors' : false,
            'organisers' : false,
            'sponsors' : false,
            'information' : ''
        };

        $scope.idSelectedEvent = null;
        $scope.event = new EventService.events()
        $scope.event.hosts = [];
        $scope.event.tags = [];
        $scope.event.requiresApplication = ["mentor", "sponsor", "organiser"];
        $scope.event.attendeeApplication = false;

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

           // Change State
           $scope.idSelectedEvent = idSelectedEvent;

           // Change embedded tab to empty
           $scope.changeManageTab(null);

           // Populate the page with Creating an event shtuff
           if (idSelectedEvent === 'create') {
                $scope.event = new EventService.events()
                $scope.event.hosts = [];
                $scope.event.tags = [];
                $scope.event.hidden = true;
                $scope.event.requiresApplication = ["mentor", "sponsor", "organiser"];
                $scope.event.attendeeApplication = false;
           } 
           // Get the event selected from db and populate page with Update event shtuff
           else if (idSelectedEvent !== null) {
                $scope.changeManageTab('dashboard');
                $scope.event = EventService.events.show({name:idSelectedEvent})
                if (!$scope.event.requiresApplication || $scope.event.requiresApplication.length === 0) {
                    console.error("Updated")
                    $scope.event.requiresApplication = ["mentor", "sponsor", "organiser"]
                    $scope.event.attendeeApplication = true;
                    console.error($scope.event.requiresApplication)
                }
           }
        };
        
        $scope.changeManageTab = function(tab) {
            $scope.manageTab = tab;
        }

        // initialise from GET
        if ($scope.getEventId) {
            $scope.setSelected($scope.getEventId);
        }

        $scope.hackageInformation = function(event, package_id) {
            var package_info = $filter('filter')($scope.hackages, {id: package_id}, true);
            $mdDialog.show(
              $mdDialog.alert()
                .title(package_info[0].name + ' package info')
                .textContent(package_info[0].desc)
                .ariaLabel(package_info[0].name + ' package info')
                .ok('Roger that!')
                .targetEvent(event)
            );
        };

        // Is the id contained in the array
        function filterArray(array, _id) {
            var ret = $filter('filter')(array, {id: _id}, true);
            if (ret.length) {
                return true;
            } else {
                return false;
            }
        }

        // Check if the package is in the next build
        $scope.checkPackage = function(package_id) {
            if (filterArray($scope.heroku.current_build_hackages, package_id)) {
                return !(filterArray($scope.heroku.removed_hackages, package_id));
            } else {
                return (filterArray($scope.heroku.added_hackages, package_id));
            }
        };

        $scope.updateNewEventStatus = function(eventStatus) {
            $scope.newEventStatus = eventStatus;
        };

        $scope.updateEventStatus = function() {
            $scope.event.hidden = $scope.newEventStatus;
            $scope.submit();
        };

        $scope.updateRequiresApplication = function(usertype) {
            if ($scope.event.requiresApplication) {
                console.error("It found application")
                var index = $scope.event.requiresApplication.indexOf(usertype);
                if (index > -1) {
                    console.error("It contains " + usertype)
                    $scope.event.requiresApplication.splice(index, 1);
                } else {
                    console.error("It doesnt contain " + usertype)
                    $scope.event.requiresApplication.push(usertype);
                }
            } else {
                console.error("It did not found application")
                $scope.event.requiresApplication = ["mentor", "sponsor", "organiser"]
            }
        };
        // Update the heroku build status
        $scope.updateBuildStatus = function(package_id) {

            console.error('The current package : ' + package_id);

            // If added, remove
            if (filterArray($scope.heroku.added_hackages, package_id)) {

                var added = [];
                for (var i in $scope.heroku.added_hackages) {
                    var _id = $scope.heroku.added_hackages[i].id;
                    if (_id !== package_id) {
                        added.push({'id' : _id});
                    }
                }

                $scope.heroku.added_hackages = added;
            } 
            // If removed, add it
            else if (filterArray($scope.heroku.removed_hackages, package_id)) {

                var removed = [];
                for (var j in $scope.heroku.removed_hackages) {
                    var _jid = $scope.heroku.removed_hackages[j].id;
                    if (_jid !== package_id) {
                        removed.push({'id' : _jid});
                    }
                }

                $scope.heroku.removed_hackages = removed;
            } 
            // If its in the build, remove it
            else if (filterArray($scope.heroku.current_build_hackages, package_id)) {
                $scope.heroku.removed_hackages.push({'id' : package_id});
            } 
            // else its not in the build, add it
            else {
                $scope.heroku.added_hackages.push({'id' : package_id});
            }

            // Any additions / removals
            var changedPackages = $scope.heroku.added_hackages.length + $scope.heroku.removed_hackages.length;
            if (changedPackages > 0) {
                $scope.heroku.req_rebuild = true;
            } else {
                $scope.heroku.req_rebuild = false;
            }
        };

        // Build the heroku server with new parameters
        $scope.buildServer = function() {
            // Build the heroku, update the heroku status
            $scope.heroku.req_rebuild = false;
            // Update the build packages
            $scope.heroku.current_build_hackages = $scope.heroku.next_build_hackages;
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
        $scope.herokuAuth = function(){
           // herokuPassport.authenticate('heroku',{state:$scope.idSelectedEvent})
        }
        $scope.submit = function() {
            if ('create' === $scope.idSelectedEvent){
                console.log($scope.event)
                $scope.event.$save(function(event) {
                    console.log(event);
                    $scope.events.push({_id:event._id, title:event.title, organisation: event.organisation})
                    $scope.setSelected(event._id)
                });
            } else {
                EventService.events.update({name:$scope.idSelectedEvent}, $scope.event);
                $scope.newEventStatus = null;
            }
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

    HackathorgHostedController.$inject = ['$scope', 'Global', '$stateParams', 'EventService', '$state', '$mdDialog', '$filter'];
})();
