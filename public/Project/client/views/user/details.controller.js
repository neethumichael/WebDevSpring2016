/**
 * Created by neethu on 3/10/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("DetailsController", DetailsController);
    function DetailsController($rootScope, $http) {

        var REP_URL = "https://api.github.com/repositories/";
        $rootScope.repDetail = false;
        $rootScope.searchRepository = searchRepository;

        function searchRepository(Repository) {
            $http.get(REP_URL + Repository.id).success(function (data) {
                $rootScope.repoDetails = data;
                $rootScope.repDetail = true;

                $http.get(REP_URL + Repository.id + "/commits").success(getSelectedRepCommitDetails);
            });
        }

        function getSelectedRepCommitDetails(data) {
            $rootScope.commits = data;
        }
    }
}());
