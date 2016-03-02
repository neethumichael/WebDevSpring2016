/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService, $rootScope) {
        $scope.login = login;
        $scope.message = null;

        function login(user_cred) {

            var user = UserService.findUserByCredentials({username: user_cred.username, password: user_cred.password});
            if (user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            } else {
                $scope.message = "Invalid credentials";
            }
        }
    }
}());
