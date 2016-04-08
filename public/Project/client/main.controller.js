/**
 * Created by neethu on 3/25/2016.
 */

(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("mainController", mainController);

    function mainController($rootScope, $location, $routeParams)
  {
        $rootScope.$on('$routeChangeSuccess', function(event, current) {
            // Look at $location.path()
            // If it isn't what you want, toggle showSideBar...
            if($location.url() == '/dashboard' || $location.url() == '/project' || $location.url() == '/profile'
            || $location.url() == '/search' || $location.url() == '/renderProjects' || $location.url() == '/projectCommits')
            $rootScope.showSideBar = true;
            else
                $rootScope.showSideBar = false;
})
}}());
