/**
 * Created by neethu on 3/10/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("SearchController", SearchController);
    function SearchController($rootScope, ProjectService) {
        var vm = this;
        vm.r1 = 0;
        var grade;
        vm.currentUser = $rootScope.currentUser;
       vm.search = search;
        vm.submitGrade = submitGrade;
        var user = $rootScope.currentUser;
        console.log("usr "+user.username);

        function submitGrade(project) {
            ProjectService.updateProject(project)
                .then(function (response){
                });
        }


        function search(data) {
            if(!data.title && !data.keywords && !data.status) {
                vm.message = "Enter one of the search criteria";
                return;
            }
            ProjectService.searchProject(data, user)
                .then( function(response) {
                    vm.currentSearchProject = response.data;
                });
        }
    }
}());

