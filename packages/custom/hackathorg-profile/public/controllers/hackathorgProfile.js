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

        // The current username being viewed (empty if viewing self)
        $scope.vieweduser = $stateParams.username;

        $scope.viewself = false;

        // If this user is the user being viewed
        if ($scope.vieweduser === null || $scope.thisuser.id === $scope.userToId($scope.vieweduser)){
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
        $scope.user = HackathorgProfile.profiles.show({userId:$stateParams.username});
        $scope.user.following = [{
            'id':'2343243242'
        }, {
            'id':'1932924584'
        }, {
            'id':'3244434343'
        }];


        /* User follower data & functions */

        $scope.user.followers = [{
            'id':'3245673243'
        }, {
            'id':'1231231233'
        }, {
            'id':'3244434343'
        }];

        $scope.isFollowing = function(_id) {
            var followinglen = $scope.user.following.length;
            for (var i = 0; i < followinglen; i++) {
                if ($scope.user.following[i].id === _id) {
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
