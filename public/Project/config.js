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
            .when("/contact", {
                templateUrl: "views/ContactUs/contact.view.html"
            })
            .when("/userGitProfile", {
                templateUrl: "views/user/user.gitprofile.view.html",
                controller: "ProjectController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/project", {
                templateUrl: "views/project/project.view.html",
                controller: "ProjectController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/dashboard", {
                 templateUrl: "views/dashboard/dashboard.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }

        })
            .when("/contact", {
                templateUrl: "views/contact/contact.view.html",
                controller: "ContactController",
                controllerAs: "model"
            })
            .when("/access", {
                templateUrl: "views/projects/access.view.html",
                controller: "ProjectController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/projectCommits", {
                templateUrl: "views/project/project.commits.view.html",
                controller: "ProjectController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
        })
            .when("/", {
                templateUrl:"views/home/home.view.html"
            })
            .when("/renderProjects", {
                templateUrl:"views/project/renderProjects.html",
                resolve: {
                    loggedin: checkLoggedin
                }
        })
            .when("/home", {
                templateUrl:"views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/search", {
                templateUrl:"views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
        })
            .when("/profile", {
                templateUrl: "views/user/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/register", {
                templateUrl: "views/user/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/adminContact", {
                templateUrl: "views/contact/admin.contact.view.html",
                controller: "ContactController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
        })
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/projecttracker/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });
        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/projecttracker/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/projecttracker/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        return deferred.promise;
    };
})();


