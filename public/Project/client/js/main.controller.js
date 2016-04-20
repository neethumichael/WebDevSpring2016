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
            if($location.url() == '/dashboard'
                || $location.url() == '/project'
                || $location.url() == '/profile'
                || $location.url() == '/search'
                || $location.url() == '/renderProjects'
                || $location.url() == '/projectCommits'
                || $location.url() == '/userGitProfile'
                || $location.url() == '/admin'
                || $location.url() == '/adminContact'
            || ($location.url() == '/contact' && $rootScope.currentUser))

                $rootScope.showSideBar = true;
            else
                $rootScope.showSideBar = false;

            $('.login-register').css('background-image', 'url("images/bc.jpg")');
            $(document).ready(function() {
                if ($location.url() == '/login' || $location.url() == '/register') {
                    $("body").css('background-image', 'url("http://thenextweb.com/wp-content/blogs.dir/1/files/2014/05/laptop-on-work-desk.jpg")');
                }
                else {
                    $("body").css('background-image', 'url("images/bc.jpg")');
                }
            });
        })
  }
}());
