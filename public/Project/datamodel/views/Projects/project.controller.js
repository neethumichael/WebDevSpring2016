/**
 * Created by neethu on 3/3/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("ProjectController", ProjectController);

    function ProjectController($rootScope, $scope, ProjectService, TaskService) {
        $scope.addProject = addProject;
        $scope.removeProject = removeProject;
        $scope.selectProject = selectProject;
        $scope.updateProject = updateProject;
        $scope.projects = ProjectService.getAllProjects();
        $scope.tasks = TaskService.getAllTasks();

        function addProject(project) {
            $scope.message = null;
            errorCheck(project);
            if ($scope.message) {
                return;
            }
            ProjectService.addProject(project);
            $scope.project = null;
            $rootScope.selectedProjectIndex = null;
        }

        function removeProject(project) {
            ProjectService.removeProject(project);
        }

        function selectProject(index) {
            $scope.project = ProjectService.selectProject(index);
        }
        function updateProject(project) {
            $scope.message = null;
            errorCheck(project);
            if ($scope.message) {
                return;
            }
            $scope.project = ProjectService.updateProject(project);
            $scope.project = null;
            $rootScope.selectedProjectIndex = null;
        }

        function errorCheck(project) {
            if (typeof project === "undefined") {
                $scope.message = "Please fill in the required fields";
                return;
            }

            if (project === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!project.title) {
                $scope.message = "Please provide a title";
                return;
            }
            if (!project.description) {
                $scope.message = "Please provide a description";
                return;
            }
            if (!project.status) {
                $scope.message = "Please provide a status";
                return;
            }
            if (!project.startDate) {
                $scope.message = "Please provide a start date";
                return;
            }
            if (!project.endDate) {
                $scope.message = "Please select an end date";
                return;
            }
        }
    }
}());

