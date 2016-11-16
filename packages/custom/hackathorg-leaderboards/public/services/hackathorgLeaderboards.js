(function() {
    'use strict';

    function HackathorgLeaderboards($http, $q) {
        return {
            name: 'hackathorg-leaderboards',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/hackathorgLeaderboards/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.hackathorg-leaderboards')
        .factory('HackathorgLeaderboards', HackathorgLeaderboards);

    HackathorgLeaderboards.$inject = ['$http', '$q'];

})();
