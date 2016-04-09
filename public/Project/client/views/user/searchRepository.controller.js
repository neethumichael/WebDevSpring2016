(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http,$rootScope) {
        var USER_URL = "https://api.github.com/users/";
        var REP_URL = "https://api.github.com/repositories/";

        $scope.userNotFound = false;
        $scope.loaded = false;
        var username = null;
        function init() {
            console.log("here"+$rootScope.gitUserProfile);
            if ($rootScope.gitUserProfile === undefined) {
                $scope.message = "Enter a valid username";
                return;
            }
            username = $rootScope.gitUserProfile ;
            var CURRENT_USER_URL = USER_URL+username;
            $http.get(CURRENT_USER_URL)
                .success(getUserDetails)
                .error(function () {
                    $scope.userNotFound = true;
                });
        }

        init();
        function getUserDetails(data) {
            $scope.user = data;
            $scope.loaded = true;

            $http.get(USER_URL+ $rootScope.gitUserProfile  + "/repos")
                .success(renderRepositories);
        }

        function renderRepositories(response) {
            $scope.repos = response;
            $scope.reposFound = response.length;
        }
    }
}());

