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
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
            })
            .when("/contact", {
                templateUrl: "views/ContactUs/contact.view.html"
            })
            .when("/project", {
                templateUrl: "views/project/project.view.html",
            })
            .when("/dashboard", {
                 templateUrl: "views/dashboard/dashboard.view.html",

        })
            .when("/login", {
                templateUrl: "views/login/login.view.html"
            })
            .when("/", {
                templateUrl:"views/home/home.view.html"
            })
            .when("/home", {
                templateUrl:"views/home/home.view.html"
            })
            .when("/register", {templateUrl: "views/register/register.view.html"
            })
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }
})();


