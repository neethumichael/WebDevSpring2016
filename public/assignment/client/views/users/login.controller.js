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
                    .success(function(response) {
                        var user = response.data;
                        console.log("her");
                        if(response) {
                            console.log("her");
                            $rootScope.currentUser = user;
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        }})
                        .error (function(err){

                            vm.error = err;
                            vm.message = " Invalid Credentials";
                        });
                    }

            else {
               vm.message = "Username/password field is empty";
            }
        }
    }
}());
