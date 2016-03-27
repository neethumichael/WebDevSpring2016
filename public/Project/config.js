/**
 * Created by neethu on 3/22/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/user", {
                templateUrl: "views/user/user.view.html",
            })
            .when("/contact", {
                templateUrl: "views/ContactUs/contact.view.html"
            })
            .when("/project", {
                templateUrl: "views/project/project.view.html",
                controller: "ProjectController",
                controllerAs: "model"
            })
            .when("/dashboard", {
                 templateUrl: "views/dashboard/dashboard.view.html",

        })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl:"views/home/home.view.html"
            })
            .when("/renderProjects", {
                templateUrl:"views/project/renderProjects.html"
        })
            .when("/home", {
                templateUrl:"views/home/home.view.html"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/searchRepositories.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }
})();


