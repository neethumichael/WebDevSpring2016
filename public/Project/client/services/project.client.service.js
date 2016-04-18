/**
 * Created by neethu on 3/3/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .factory("ProjectService", ProjectService);

    function ProjectService($rootScope, $http, ProjectUserService) {

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
            updateProjectManager: updateProjectManager,
            updateAccess: updateAccess,
            addAccess: addAccess,
            findAllAccess: findAllAccess,
            deleteAccess: deleteAccess
        };
        return model;
        $rootScope.projects = projects;



        function updateAccess(access) {
            console.log("inside serve"+access.userId);
            return $http.put("/api/projecttracker/project/Access/",access);
        }

        function deleteAccess(access) {
            return $http.delete("/api/projecttracker/project/Access/"+access._id);
        }

        function addAccess(project, access) {
            return $http.post("/api/projecttracker/project/Access/"+project._id,access);
        }

        function findAllAccess(project) {
            return $http.get("/api/projecttracker/project/Access/"+project._id);
        }

        function updateProjectManager(project,currentProjectemail) {
            return $http.put("/api/projecttracker/project/editAccess/"+project._id+"/"+currentProjectemail);
        }

        function resetProject() {
            $rootScope.project = null;
        }

        function searchProject(searchString, user) {
            //return $http.put("/api/projecttracker/project/search/",searchString);
            return $http.post("/api/projecttracker/project/search/"+user._id+"/"+user.roles+"/"+user.email,searchString);
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


