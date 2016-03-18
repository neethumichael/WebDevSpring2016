/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {

        var vm = this;

        vm.register = register;
        vm.message = null;

        function init() {

        }
        init();

        function register(user) {
            vm.message = null;
            if(typeof user === "undefined") {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (user === null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.email) {
                vm.message = "Please provide an email id";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password !== user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            console.log("jdhd "+user.username);
            UserService.findUserByUsername(user.username).then(
            function(response) {
                console.log("what "+response.data);
                if (response.data !== null) {
                    vm.message = "User already exists";
                    return;
                }
                else {
                    UserService.createUser(user)
                        .then(function(response){
                            var currentUser = response.data;
                            console.log("test in controller "+response.data.username);
                            UserService.setCurrentUser(currentUser);
                            $location.url('/profile');
                        });

                }
            });


        }
    }
}());
