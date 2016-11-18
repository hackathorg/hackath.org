(function() {
    'use strict';

    function HackathorgProfile($http, $q) {
        return {
            name: 'hackathorg-profile',
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

    HackathorgProfile.$inject = ['$http', '$q'];

})();