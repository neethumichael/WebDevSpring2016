/**
 * Created by neethu on 3/3/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .factory("ProjectService", ProjectService);

    function ProjectService($rootScope, $http, UserService) {

        var selectedProjectIndex = null;
        var selectedProject = null;
        var model = {
            updateProject: updateProject,
            deleteProject: deleteProject,
            addProject: addProject,
            getAllProjects: getAllProjects,
            setCurrentProject: setCurrentProject,
            getCurrentProject: getCurrentProject,
            resetProject: resetProject,
            findAllProjectsForUser: findAllProjectsForUser,
            searchProject: searchProject
        };
        return model;
        $rootScope.projects = projects;

        function resetProject() {
            $rootScope.project = null;
        }

        function searchProject(searchString) {
            console.log("data.title "+searchString.title);
            console.log("data.status "+searchString.status);
            console.log("data.keywords "+searchString.keywords);
            //return $http.get("/api/projecttracker/project/search?title=" + searchString.title + "&status=" + searchString.status
           // +"&keywords=" +searchString.keywords);
            return $http.get("/api/projecttracker/project/search/"+searchString.title+"/"+searchString.status+"/"+searchString.keywords);
        }

        function updateProject(project) {
            return $http.put("/api/projecttracker/project/",project);
        }

        function addProject(project,userId) {
            return $http.post("/api/projecttracker/project/"+userId, project);
        }

        function getAllProjects() {
            return $http.get("/api/projecttracker/project");
        }

       function deleteProject(projectId) {
           return $http.delete("/api/projecttracker/project/"+projectId);
       }

        function setCurrentProject(project) {
            selectedProject = project;
           // console.log("fset dsj"+$rootScope.project.title);
        }

        function getCurrentProject() {
            console.log(selectedProject.title);
            return selectedProject;
        }


        function findAllProjectsForUser(userId) {
            return $http.get("/api/assignment/project/"+userId+"/user");
        }
    }
})();


