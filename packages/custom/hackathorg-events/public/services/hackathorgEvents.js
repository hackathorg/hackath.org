(function() {
    'use strict';

    function HackathorgEvents($http, $q) {
        return {
            name: 'hackathorg-events',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/hackathorgEvents/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.hackathorg-events')
        .factory('HackathorgEvents', HackathorgEvents);

    HackathorgEvents.$inject = ['$http', '$q'];

})();
