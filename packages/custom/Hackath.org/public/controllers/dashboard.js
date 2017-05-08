'use strict';

angular.module('mean.system').controller('DashboardController', ['$scope', 'Global', 'MeanUser', 'Dashboard', '$state', '$rootScope',
  function ($scope, Global, MeanUser, Dashboard, $state, $rootScope) {
    $scope.global = Global;
    var vm = this;

    vm.hdrvars = {      
      authenticated: MeanUser.loggedin,
      user: MeanUser.user,
      isAdmin: MeanUser.isAdmin
    }

    if (!vm.hdrvars.authenticated) {
      $state.go('home');
    }

    $scope.user = vm.hdrvars.user;
    $scope.dashboardviews = [vm.hdrvars.user.name];
    $scope.dashboardview = vm.hdrvars.user.name;
    $scope.following = Dashboard.follower.follows();
    $scope.userevents = Dashboard.profiles.events();

    $rootScope.$on('loggedin', function () {

      vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin
      }
      $scope.user = vm.hdrvars.user;
      $scope.following = Dashboard.follower.follows();

      $scope.viewas = vm.hdrvars.user.name;

    });

    $rootScope.$on('logout', function () {
      vm.hdrvars = {
        authenticated: false,
        user: {},
        isAdmin: false
      };

      $state.go('home');
    });
  }
]);
