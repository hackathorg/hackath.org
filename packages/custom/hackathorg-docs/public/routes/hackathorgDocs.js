(function() {
    'use strict';

    function HackathorgDocs($stateProvider) {
        $stateProvider.state('hackathorgDocs example page', {
            url: '/hackathorgDocs/example',
            templateUrl: 'hackathorg-docs/views/index.html'
        }).state('hackathorgDocs circles example', {
            url: '/hackathorgDocs/example/:circle',
            templateUrl: 'hackathorg-docs/views/example.html'
        });
    }

    angular
        .module('mean.hackathorg-docs')
        .config(HackathorgDocs);

    HackathorgDocs.$inject = ['$stateProvider'];

})();
