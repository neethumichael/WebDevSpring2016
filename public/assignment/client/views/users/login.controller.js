/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;

        vm.login = login;
        vm.message = null;

        function init() {
        }
        init();

        function login(user_cred) {

            if(typeof user_cred!== "undefined") {
                UserService.findUserByCredentials(user_cred)
                    .then(function(response)
                    {
                        var user = response.data;
                        if(response.data) {
                            $rootScope.currentUser = user;
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        }
                        else {
                            vm.message = "Invalid credentials";
                        }
                    });
                    }
            else {
               vm.message = "Username/password field is empty";
            }
        }
    }
}());
