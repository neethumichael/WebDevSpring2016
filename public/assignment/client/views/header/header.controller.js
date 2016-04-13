/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController(UserService, $location, $rootScope) {
        var vm = this;

        vm.logout = logout;
        function init() {
            vm.$location = $location;
        }
        init();
        function logout() {
            UserService
                .logout()
                .then(function(response){
                    console.log("current user "+$rootScope.currentUser);
                    UserService.setCurrentUser(null);
                    console.log("current user "+$rootScope.currentUser);
                    $location.url("/home");
                }),
            function(err) {
                vm.error = err;
            }
        }
    }
}());
