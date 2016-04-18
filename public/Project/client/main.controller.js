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
            || $location.url() == '/search' || $location.url() == '/renderProjects' || $location.url() == '/projectCommits'
            || $location.url() == '/userGitProfile' || $location.url() == '/admin')
            $rootScope.showSideBar = true;
            else
                $rootScope.showSideBar = false;
            $('.login-register').css('background-image', 'url("images/bc.jpg")');
            console.log("gfg");
            $(document).ready(function() {
                if ($location.url() == '/login' || $location.url() == '/register') {
                    $("body").css('background-image', 'url("http://thenextweb.com/wp-content/blogs.dir/1/files/2014/05/laptop-on-work-desk.jpg")');
                }
                else {
                    $("body").css('background-image', 'url("images/bc.jpg")');

                }
            });
})
}}());
