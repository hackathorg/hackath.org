(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgProfileController($scope, Global, HackathorgProfile, $stateParams, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-profile'
        };

        /* User profile data and functions */
        
        $scope.userToId = function(username) {
            //Get the ID for a given username
            return username
        }

        // The current users information
        $scope.thisuser = {'_id' : MeanUser.user._id};

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

        $scope.user = HackathorgProfile.profiles.show({userId:$scope.userToId($scope.vieweduser)});

        /* User follower data & functions */
        $scope.user_follower = HackathorgProfile.follower;

        $scope.selffollowing = $scope.user_follower.follows({userId:$scope.thisuser._id});
        console.log($scope.thisuser._id)

        $scope.following = $scope.user_follower.follows({userId:$scope.vieweduser});
        $scope.followers = $scope.user_follower.followers({userId:$scope.vieweduser});

        console.log($scope.selffollowing)
        console.log($scope.following)

        $scope.follow = function(user) {
            $scope.user_follower.follow({userId: user});
            $scope.selffollowing.follows.push({'id':user});
            if ($scope.viewself) {
                $scope.following.follows.push({'id':user});
            } else {
                $scope.following.followers.push({'id':user});
            }
        }
        
        $scope.unfollow = function(user, index) {
            $scope.user_follower.unfollow({userId: user});

            for (var i =0; i < $scope.selffollowing.follows.length; i++){
               if ($scope.selffollowing.follows[i].id === user) {
                  $scope.selffollowing.follows.splice(i,1);
                  break;
               }
            }

            if (index !== -1) {
                if ($scope.viewself) {
                    $scope.following.follows.splice(index,1);
                } else {
                    $scope.following.followers.splice(index,1);
                }
            }
        }


        $scope.isFollowing = function(_id) {
            var followinglen = $scope.selffollowing.follows.length;
            for (var i = 0; i < followinglen; i++) {
                if ($scope.selffollowing.follows[i].id === _id) {
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
    }

    angular
        .module('mean.hackathorg-profile')
        .controller('HackathorgProfileController', HackathorgProfileController);

    HackathorgProfileController.$inject = ['$scope', 'Global', 'HackathorgProfile', '$stateParams', 'MeanUser'];

})();
