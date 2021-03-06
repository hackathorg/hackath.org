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
                },
                herokuCreate: {
                    method: 'POST',
                    url: '/api/heroku/create/:name'
                }, 
                herokuRebuild:{
                    method: 'POST',
                    url: '/api/heroku/rebuild/:name'
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
                    url: '/api/applications/:applicationId/cancel'
                },
                reviewApplication : {
                    method: 'POST',
                    url: '/api/applications/:applicationId/review'
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
