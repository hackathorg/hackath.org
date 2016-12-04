(function() {
    'use strict';

    function HackathorgCreate($stateProvider) {
        $stateProvider.state('create', {
            url: '/create',
            templateUrl: 'hackathorg-create/views/index.html'
        });
    }

    angular
        .module('mean.hackathorg-create')
        .config(HackathorgCreate);

    HackathorgCreate.$inject = ['$stateProvider'];

})();
