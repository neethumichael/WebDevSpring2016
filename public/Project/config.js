/**
 * Created by neethu on 3/22/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .config(configuration)
    .filter('startFrom', function() {
        return function(data, start) {
            return data.slice(start);
        }
    });

    function configuration($routeProvider) {
        $routeProvider
            .when("/user", {
                templateUrl: "views/user/user.view.html",
            })
            .when("/contact", {
                templateUrl: "views/ContactUs/contact.view.html"
            })
            .when("/userGitProfile", {
                templateUrl: "views/user/user.gitprofile.view.html",
                controller: "ProjectController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
            })
            .when("/project", {
                templateUrl: "views/project/project.view.html",
                controller: "ProjectController",
                controllerAs: "model"
            })
            .when("/dashboard", {
                 templateUrl: "views/dashboard/dashboard.view.html"

        })
            .when("/contact", {
                templateUrl: "views/contact/contact.view.html",
                controller: "ContactController",
                controllerAs: "model"
            })
            .when("/access", {
                templateUrl: "views/projects/access.view.html",
                controller: "ProjectController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/projectCommits", {
                templateUrl: "views/project/project.commits.view.html",
                controller: "ProjectController",
                controllerAs: "model"
        })
            .when("/", {
                templateUrl:"views/home/home.view.html"
            })
            .when("/renderProjects", {
                templateUrl:"views/project/renderProjects.html"
        })
            .when("/home", {
                templateUrl:"views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/search", {
                templateUrl:"views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
        })
            .when("/profile", {
                templateUrl: "views/user/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }
})();


