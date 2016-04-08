/**
 * Created by neethu on 3/3/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("TaskController", TaskController);

    function TaskController($rootScope, $scope, TaskService, UserService, ProjectService) {
        $scope.addTask = addTask;
        $scope.removeTask = removeTask;
        $scope.selectTask = selectTask;
        $scope.updateTask = updateTask;
        $scope.tasks = TaskService.getAllTasks();
        $scope.users = UserService.getAllUsers();
        $scope.projects = ProjectService.getAllProjects();

        function addTask(task) {
            $scope.message = null;
            errorCheck(task);
            if ($scope.message) {
                return;
            }
            TaskService.addTask(task);
            $scope.task = null;
            $rootScope.selectedTaskIndex = null;
        }

        function removeTask(task) {
            TaskService.removeTask(task);
        }

        function selectTask(index) {
            $scope.task = TaskService.selectTask(index,ProjectService.getAllProjects());
        }

        function updateTask(task) {
            $scope.message = null;
            errorCheck(task);
            if ($scope.message) {
                return;
            }
           TaskService.updateTask(task);
            $scope.task = null;
            $rootScope.selectedTaskIndex = null;
        }

        function errorCheck(task) {
            if (typeof task === "undefined") {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (task === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!task.title) {
                $scope.message = "Please provide a title";
                return;
            }
            if (!task.description) {
                $scope.message = "Please provide a description";
                return;
            }
            if (!task.status) {
                $scope.message = "Please provide a status";
                return;
            }
            if (!task.assigned_to) {
                $scope.message = "Please assign project";
                return;
            }
            if (!task.projects) {
                $scope.message = "Please select a project";
                return;
            }
        }
    }
}());

