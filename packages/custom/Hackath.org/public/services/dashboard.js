(function() {
    'use strict';

    function Dashboard($http, $q, $resource) {
        return {
            name: 'header',
            follower: $resource('api/follower/:userId', {
                userId: '@userId'
                }, {
                followers: {
                    method: 'GET',
                    isArray: true,
                    url: '/api/followers/:userId'
                },
                follows: {
                    method: 'GET', 
                    isArray: true, 
                    url: '/api/follows/:userId'
                },
                followerstats: {
                    method: 'GET',                   
                    url: '/api/followerstats/:userId'
                },
                follow: {
                    method: 'POST',
                    url: '/api/follow/:userId'
                },
                unfollow: {
                    method: 'POST',
                    url: '/api/unfollow/:userId'
                }
            }),
        }
    }
    angular
        .module('mean.system')
        .factory('Dashboard', Dashboard);

    Dashboard.$inject = ['$http', '$q', '$resource'];

})();
