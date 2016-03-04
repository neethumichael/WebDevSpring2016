(function(){
angular
    .module("GitApi", [])
    .controller("SearchController", SearchController);
function SearchController($scope, $http) {
    $scope.getGitInfo = function () {
        $scope.userNotFound = false;
        $scope.loaded = false;

        $http.get("https://api.github.com/users/" + $scope.username)
            .success(function (data) {
                $scope.user = data;
                $scope.loaded = true;
            })
            .error(function () {
                $scope.userNotFound = true;
            })
        $http.get("https://api.github.com/users/" + $scope.username + "/repos")
            .success(renderDetails);
    }
    function renderDetails(response) {
        $scope.repos = response;
        $scope.reposFound = response.length;
    }

    function selectRepository(Repository) {
        $http.get("https://api.github.com/repositories/" + Repository.id + "/commits").success(function (data) {
            $scope.commits = data;
        })

    }
}
})();

