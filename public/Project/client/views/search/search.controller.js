/**
 * Created by neethu on 3/10/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("SearchController", SearchController);
    function SearchController($rootScope, ProjectService, $uibModal, $log, $location) {

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
                controller: function($uibModalInstance, grade, $scope) {
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
                ProjectService.searchProject(data, user)
                    .then(function (response) {
                        vm.currentSearchProject = response.data;
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

