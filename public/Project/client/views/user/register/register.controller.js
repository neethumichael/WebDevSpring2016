/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, ProjectUserService, $rootScope) {

        var vm = this;

        vm.register = register;
        vm.message = null;

        function init() {


        }
        init();

        function register(user) {
            vm.message = null;
            if(vm.terms==undefined||vm.terms==null) {
                vm.message = "Cannot proceed without accepting terms and conditions";
                return;
            }
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
            ProjectUserService.findUserByUsername(user.username).then(
            function(response) {
                if (response.data !== null) {
                    vm.message = "User already exists";
                    return;
                }
                else {
                    ProjectUserService.createUser(user)
                        .then(function(response){
                            var currentUser = response.data;
                            ProjectUserService.setCurrentUser(currentUser);
                            $rootScope.currentUser = currentUser;
                            $location.url('/dashboard');
                        });
                }
            });
        }
    }
}());
