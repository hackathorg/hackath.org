(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgProfileController($scope, Global, HackathorgProfile, $stateParams, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-profile'
        };

        // The current users information
        $scope.thisuser = {'_id' : MeanUser.user._id};

        // The current username being viewed (empty if viewing self)
        $scope.vieweduser = $stateParams.username;


        // using a get, get the user requested

        $scope.user = {'_id' : '123'};

        $scope.user.following = [{
            'id':'2343243242'
        }, {
            'id':'1932924584'
        }, {
            'id':'3244434343'
        }];

        $scope.user.followers = [{
            'id':'3245673243'
        }, {
            'id':'1231231233'
        }, {
            'id':'3244434343'
        }];

        $scope.selectedTab = 'default';

        $scope.isFollowing = function(_id) {
            var followinglen = $scope.user.following.length;
            for (var i = 0; i < followinglen; i++) {
                if ($scope.user.following[i].id === _id) {
                    return true
                }
            }
            return false
        };

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
