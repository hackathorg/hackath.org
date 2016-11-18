(function() {
    'use strict';

    function HackathorgDocs($stateProvider) {
        $stateProvider.state('docs', {
            url: '/docs',
            templateUrl: 'hackathorg-docs/views/index.html'
        }).state('docs circles example', {
            url: '/docs/:circle',
            templateUrl: 'hackathorg-docs/views/example.html'
        });
    }

    angular
        .module('mean.hackathorg-docs')
        .config(HackathorgDocs);

    HackathorgDocs.$inject = ['$stateProvider'];

})();
