/**
 * Created by neethu on 3/2/2016.
 */
/**
 * Created by neethu on 2/20/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/search-repositories", {
                templateUrl: "repository/view.search-repositories.html"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html"
            })
            .when("/project", {
                templateUrl: "views/Projects/project.view.html"
            })
            .when("/renderProjects", {
                templateUrl: "views/Projects/renderProjects.view.html"
            })
            .when("/renderTasks", {
                templateUrl: "views/Task/renderTasks.view.html"
            })
            .when("/task", {
                templateUrl: "views/Task/task.view.html"
            })
            .when("/document", {
                templateUrl: "views/document/document.view.html"
            })
            .otherwise({
                redirectTo: "index.html"
            });
    }
})();
