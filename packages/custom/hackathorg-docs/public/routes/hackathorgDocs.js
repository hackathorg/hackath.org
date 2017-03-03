(function() {
    'use strict';

    function HackathorgDocs($stateProvider) {
        $stateProvider.state('docs', {
            url: '/docs',
            templateUrl: 'hackathorg-docs/views/index.html'
        });
    }

    angular
        .module('mean.hackathorg-docs')
        .config(HackathorgDocs);

    HackathorgDocs.$inject = ['$stateProvider'];

})();
