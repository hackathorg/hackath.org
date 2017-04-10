(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgProfileController($scope, Global, HackathorgProfile, $stateParams, MeanUser, $rootScope, $mdDialog) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-profile'
        };

        var vm = this;
        vm.hdrvars = {      
          authenticated: MeanUser.loggedin,
          user: MeanUser.user,
          isAdmin: MeanUser.isAdmin
        }

        $scope.thisuser = {
            '_id' : vm.hdrvars.user._id,
            'username': vm.hdrvars.user.username
        };

        $rootScope.$on('loggedin', function () {

            vm.hdrvars = {
                authenticated: MeanUser.loggedin,
                user: MeanUser.user,
                isAdmin: MeanUser.isAdmin
            }
          
            $scope.thisuser = {
                '_id' : vm.hdrvars.user._id,
                'username': vm.hdrvars.user.username
            };
            // If this user is the user being viewed
            if ($scope.vieweduser === null || $scope.vieweduser === undefined || $scope.thisuser._id == $scope.userToId($scope.vieweduser)){
                $scope.viewself = true;
            }

        });

        /* User profile data and functions */
        
        $scope.userToId = function(username) {
            //Get the ID for a given username
            return username
        }

        console.log($scope.thisuser)

        // The current username being viewed (empty if viewing self)
        $scope.vieweduser = $stateParams.username;

        $scope.viewself = false;
        console.log($scope.vieweduser)

        // If this user is the user being viewed
        if ($scope.vieweduser === null || $scope.vieweduser === undefined || $scope.thisuser._id == $scope.userToId($scope.vieweduser)){
            $scope.viewself = true;
        }

        // using a get, get the user requested
        $scope.user = {
            '_id' : '123',
            'name' : 'Jamie Mahoney',
            'username' : 'mahoneyj2',
            'bio' : 'Im a fourth year Computer Science student from the UK, I love spaghetti and meatballs',
            'website' : 'www.lol.com',
            'tags': 'python, javascript, java'
        };

        /* This user */
        $scope.user = HackathorgProfile.profiles.show({userId:$scope.userToId($scope.vieweduser)});

        /* User applications */
        $scope.userApplications = HackathorgProfile.applications.user();

        /* User follower data & functions */
        $scope.user_follower = HackathorgProfile.follower;

        $scope.selffollowing = $scope.user_follower.follows({userId:$scope.thisuser._id});

        $scope.following = $scope.user_follower.follows({userId:$scope.vieweduser});
        $scope.followers = $scope.user_follower.followers({userId:$scope.vieweduser});

        //console.log($scope.selffollowing)
        //console.log($scope.following)

        $scope.follow = function(userid, username) {
            $scope.user_follower.follow({userId: userid});
            $scope.selffollowing.push({'id':userid,'username':username});
            if ($scope.viewself) {
                $scope.following.push({'id':userid,'username':username});
            } else {
                $scope.followers.push({'id':$scope.thisuser._id,'username':$scope.thisuser.username});
            }
        }
        
        $scope.unfollow = function(user, index) {
            $scope.user_follower.unfollow({userId: user});
            //console.log(index)
            for (var i =0; i < $scope.selffollowing.length; i++){
               if ($scope.selffollowing[i].id === user) {
                  $scope.selffollowing.splice(i,1);
                  break;
               }
            }

            if (index !== -1) {
                if ($scope.viewself) {
                    $scope.following.splice(index,1);
                } else {
                    $scope.followers.splice(index,1);
                }
            } else {
                for (var i =0; i < $scope.followers.length; i++){
                   if ($scope.followers[i].id === $scope.thisuser._id) {
                      $scope.followers.splice(i,1);
                      break;
                   }
                }
            }
        }

        $scope.isFollowing = function(_id) {
            //console.log(_id)
            //console.log($scope.selffollowing)
            var followinglen = $scope.selffollowing.length;
            for (var i = 0; i < followinglen; i++) {
                if ($scope.selffollowing[i].id === _id) {
                    return true
                }
            }
            return false
        };

        /* Event viewing data & functions */

        $scope.eventtype = 'Attending';

        $scope.eventtypes = [{
            'type' :'Attending' 
        }, {
            'type' :'Organising' 
        }, {
            'type' :'Mentoring' 
        }];

        $scope.selectedTab = 'default';
        if ($scope.overrideTab) {
            $scope.selectedTab = $scope.overrideTab;
        }

        $scope.checkCircle = function() {
            HackathorgProfile.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

        $scope.cancelApplication = function(application_id){
            HackathorgProfile.applications.cancelApplication({applicationId : application_id});
        };

        $scope.showApplication = function(event, application) {
            if(application.role == "attendee") {
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Application for ' + application.eventId)
                    .htmlContent('<p>Role : ' + application.role +'</p>'
                        + '<p>Response : ' + application.response +'</p>')
                    .ariaLabel(application.eventId + ' application')
                    .ok('Close')
                    .targetEvent(event)
                );
            } else {
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Application for ' + application.eventId)
                    .htmlContent('<p>Role : ' + application.role +'</p>'
                        + '<p>Description : ' + application.description +'</p>'
                        + '<p>Site : ' + application.site+'</p>'
                        + '<p>Contact : ' + application.contact+'</p>'
                        + '<p>Response : ' + application.response +'</p>')
                    .ariaLabel(application.eventId + ' package info')
                    .ok('Close')
                    .targetEvent(event)
                );
            }
        };
    }

    angular
        .module('mean.hackathorg-profile')
        .controller('HackathorgProfileController', HackathorgProfileController);

    HackathorgProfileController.$inject = ['$scope', 'Global', 'HackathorgProfile', '$stateParams', 'MeanUser', '$rootScope', '$mdDialog'];

})();
