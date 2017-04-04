(function() {
    'use strict';

    function EventService($http, $q, $resource) {
        return {
            name: 'hackathorg-events',
            events: $resource('api/events/:name', {
                name: '@name'
                }, {
                update: {
                    method: 'PUT'
                },
                show: {
                    method: 'GET'
                },
                create: {
                    method: 'POST',
                    isArray: false,
                    url: '/api/events'
                },
                all: {
                    method: 'GET',
                    isArray: true,
                    url: '/api/events'
                },
                userevents: {
                    method: 'GET',
                    isArray: true,
                    url: '/api/user/events/hosted'
                }

            }),
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/hackathorgEvents/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            },

        };
    }

    angular
        .module('mean.hackathorg-events')
        .factory('EventService', EventService);

    EventService.$inject = ['$http', '$q', '$resource'];

})();
