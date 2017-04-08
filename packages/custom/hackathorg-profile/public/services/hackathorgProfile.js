(function() {
    'use strict';

    function HackathorgProfile($http, $q, $resource) {
        return {
            name: 'hackathorg-profile',
            profiles: $resource('api/users/:userId', {
                userId: '@userId'
                }, {
                show: {
                    method: 'GET'
                }

            }),

            applications: $resource('api/application/:applicationId', {
                applicationId: '@applicationId'
                }, {
                user: {
                    method: 'GET',
                    isArray: true,
                    url: '/api/user/applications'
                }, 
                cancelApplication : {
                    method: 'POST',
                    url: '/api/applications/cancel/:applicationId'
                },
                reviewApplication : {
                    method: 'POST',
                    url: '/api/applications/review/:applicationId'
                }
            }),

            eventapplications: $resource('api/events/:eventId/applications', {
                eventId: '@eventId'
                }, {
                applications: {
                    method: 'GET', 
                    isArray: true, 
                    url: '/api/events/:eventId/applications'
                },
                apply: {
                    method: 'POST',
                    url: '/api/events/:eventId/apply'
                },
                cancel: {
                    method: 'POST',
                    url: '/api/events/:eventId/cancel'
                },
            }),
            
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
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/hackathorgProfile/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.hackathorg-profile')
        .factory('HackathorgProfile', HackathorgProfile);

    HackathorgProfile.$inject = ['$http', '$q', '$resource'];

})();
