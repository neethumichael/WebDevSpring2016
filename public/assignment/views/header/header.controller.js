/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, UserService, $location) {
        $scope.$location = $location;
        $scope.logout = logout;
        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
}());
