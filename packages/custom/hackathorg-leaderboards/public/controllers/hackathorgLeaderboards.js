(function() {
    'use strict';

    /* jshint -W098 */

    function HackathorgLeaderboardsController($scope, Global, HackathorgLeaderboards, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'hackathorg-leaderboards'
        };

        $scope.people = [
            { name: 'Janet Perkins', img: 'img/100-0.jpeg'},
            { name: 'Mary Johnson', img: 'img/100-1.jpeg'},
            { name: 'Peter Carlsson', img: 'img/100-2.jpeg'}
        ];

        $scope.userleadertype = 'attendee';

        $scope.userleadertypes = [{
            'type' :'Most attended',
            'value' : 'attendee'
        }, {
            'type' :'Most organised',
            'value' : 'organiser' 
        }, {
            'type' :'Most mentored',
            'value' : 'mentor'  
        }];

        $scope.eventleadertype = 'best';

        $scope.eventleadertypes = [{
            'type' :'Largest event',
            'value' : 'largest'
        }, {
            'type' :'Best rated event',
            'value' : 'best' 
        }, {
            'type' :'Most mentors',
            'value' : 'mentor'  
        },{
            'type' :'Most prizes',
            'value' : 'prizes'  
        }];

        $scope.checkCircle = function() {
            HackathorgLeaderboards.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.hackathorg-leaderboards')
        .controller('HackathorgLeaderboardsController', HackathorgLeaderboardsController);

    HackathorgLeaderboardsController.$inject = ['$scope', 'Global', 'HackathorgLeaderboards', '$stateParams'];

})();
