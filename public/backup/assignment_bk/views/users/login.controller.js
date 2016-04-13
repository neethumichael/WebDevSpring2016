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

            if(typeof user_cred!== "undefined") {
                var user = UserService.findUserByCredentials(user_cred.username, user_cred.password,
                    function(user) {
                        if(user) {
                            $rootScope.currentUser = user;
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        }
                        else {
                            $scope.message = "Invalid credentials";
                        }
                    });
            }
            else {
                $scope.message = "Username/password field is empty";
            }
        }
    }
}());
