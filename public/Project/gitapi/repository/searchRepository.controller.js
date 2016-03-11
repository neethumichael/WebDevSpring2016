(function(){
    'use strict';
    angular
        .module("GitApi")
        .controller("SearchController", SearchController);

function SearchController($scope, $http) {

    var USER_URL = "https://api.github.com/users/";
    var REP_URL = "https://api.github.com/repositories/";

    $scope.userNotFound = false;
    $scope.loaded = false;


    $scope.getGitInfo = getGitInfo;

    function getGitInfo(username) {
        if(username == undefined) {
            $scope.message = "Enter a valid username";
            return;
        }
        var CURRENT_USER_URL = USER_URL+username;
        $http.get(CURRENT_USER_URL)
            .success(getUserDetails)
            .error(function () {
                $scope.userNotFound = true;
            })
    }

    function getUserDetails(data) {
            $scope.user = data;
            $scope.loaded = true;

        $http.get(USER_URL+ $scope.username + "/repos")
            .success(renderRepositories);
    }

    function renderRepositories(response) {
        $scope.repos = response;
        $scope.reposFound = response.length;
    }
}
})();

