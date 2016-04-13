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
            searchProject: searchProject,
            updateProjectManager: updateProjectManager
        };
        return model;
        $rootScope.projects = projects;

        function updateProjectManager(project,currentProjectemail) {
            return $http.put("/api/projecttracker/project/editAccess/"+project._id+"/"+currentProjectemail);
        }

        function resetProject() {
            $rootScope.project = null;
        }

        function searchProject(searchString, user) {
            return $http.get("/api/projecttracker/project/search/"+searchString.title+"/"+searchString.status+"/"
                +searchString.keywords+"/user/"+user._id+"/"+user.roles+"/"+user.email);
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
        }

        function getCurrentProject() {
            return selectedProject;
        }

        function findAllProjectsForUser(userId) {
            return $http.get("/api/assignment/project/"+userId+"/user");
        }
    }
})();


