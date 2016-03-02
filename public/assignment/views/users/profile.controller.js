/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$location, UserService) {

        $scope.error = null;
        $scope.message = null;
        $scope.update = update;
        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            $scope.error = null;
            $scope.message = null;
            $location.url('/profile/');
            $scope.currentUser = UserService.updateUser(user);
            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
}());

