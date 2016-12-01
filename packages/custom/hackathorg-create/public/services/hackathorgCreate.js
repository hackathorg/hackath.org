(function() {
    'use strict';

    function HackathorgCreate($http, $q) {
        return {
            name: 'hackathorg-create',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/hackathorgCreate/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.hackathorg-create')
        .factory('HackathorgCreate', HackathorgCreate);

    HackathorgCreate.$inject = ['$http', '$q'];

})();
