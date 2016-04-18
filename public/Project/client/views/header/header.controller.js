/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("HeaderController",HeaderController);

    function HeaderController(ProjectUserService, $location) {
        var vm = this;

        vm.logout = logout;
        function init() {
            vm.$location = $location;
        }
        init();
        function logout() {
            ProjectUserService
                .logout()
                .then(function(){
                    ProjectUserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
}());
