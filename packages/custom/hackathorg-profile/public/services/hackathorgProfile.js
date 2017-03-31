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
            
            follower: $resource('api/follower/:userId', {
                userId: '@userId'
                }, {
                followers: {
                    method: 'GET',
                    url: '/api/followers/:userId'
                },
                follows: {
                    method: 'GET',  
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
