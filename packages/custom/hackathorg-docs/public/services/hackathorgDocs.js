(function() {
    'use strict';

    function HackathorgDocs($http, $q) {
        return {
            name: 'hackathorg-docs',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.hackathorg-docs')
        .factory('HackathorgDocs', HackathorgDocs);

    HackathorgDocs.$inject = ['$http', '$q'];

})();
