/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("LoginController", LoginController);

    function LoginController($location, ProjectUserService, $rootScope) {
        var vm = this;

        vm.login = login;
        vm.message = null;

        function init() {
        }
        init();

        function login(user_cred) {
            if(typeof user_cred!== "undefined") {
                ProjectUserService.findUserByCredentials(user_cred)
                    .then(function(response)
                    {
                        var user = response.data;
                        if(response.data) {
                            $rootScope.currentUser = user;
                            ProjectUserService.setCurrentUser(user);
                            $location.url("/dashboard");
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
