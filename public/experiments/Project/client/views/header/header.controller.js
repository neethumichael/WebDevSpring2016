/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("HeaderController",HeaderController);

    function HeaderController( $location, UserService) {
        var vm = this;

        vm.logout = logout;
        function init() {
            vm.$location = $location;
        }
        init();
        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $rootScope.currentProject = null;
                    $location.url("/home");
                });
        }
    }
}());
