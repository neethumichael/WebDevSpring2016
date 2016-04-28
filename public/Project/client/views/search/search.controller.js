/**
 * Created by neethu on 3/10/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("SearchController", SearchController);
    function SearchController($rootScope, ProjectService, $uibModal, $log, $location, ProjectUserService) {

        var vm = this;

        vm.sortType     = 'model.user.username';
        vm.sortReverse  = true;
        var grade;
        vm.currentUser = $rootScope.currentUser;
        vm.search = search;
        vm.submitGrade = submitGrade;
        vm.clear = clear;
        var user = $rootScope.currentUser;

        function submitGrade(selectedProject) {

            var textUrl = 'views/search/grade.view.html';

            var updateGrade = $uibModal.open ({
                templateUrl: textUrl,
                controller: function($uibModalInstance, $scope) {
                    $scope.project = selectedProject;
                    if(selectedProject.grade)
                    $scope.project.grade = selectedProject.grade;
                    if(selectedProject.gradeTotal)
                    $scope.project.gradeTotal = selectedProject.gradeTotal;
                    if(selectedProject.gradeComments)
                    $scope.project.gradeComments = selectedProject.gradeComments;

                    $scope.ok = function () {
                        $uibModalInstance.close(grade);
                    };

                    $scope.cancel = function () {
                        $scope.grade = grade;
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.updateGrade = function(newGrade,project) {
                        if (newGrade) {
                            selectedProject.grade = newGrade.grade;
                            selectedProject.gradeTotal = newGrade.gradeTotal;
                            selectedProject.gradeComments = newGrade.gradeComments;
                            ProjectService.updateProject(selectedProject)
                                .then(function (response){
                                });
                        }
                        else {
                            vm.message = "Select a field to update";
                            vm.selectedProject = null;
                        }
                    }
                },
                resolve: {
                    grade: function () {
                        return selectedProject;
                    }
                }
            });
        }

        function search(data) {
            if(data) {
                var projects = ProjectService.searchProject(data, user)
                    .then(function (response) {
                            var projects = response.data;
                        for(var u in projects) {
                            ProjectUserService.findByIdAdmin(projects[u].userId).then(
                                function (user) {
                                    projects[u].username = user.data.username;
                                },
                                function (err) {
                                    console.log("error "+err);
                                });
                        }
                        vm.currentSearchProject = projects;
                        return projects;
                        //console.log("ddjcndcjdncjdk "+response.data[0].username);
                    });

            } else {
                vm.message = "Enter atleast one search criteria";
                return;
            }
        }

        function clear() {
            vm.searchProject =null;
            vm.currentSearchProject = null;
        }
    }
}());

