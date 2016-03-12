/**
 * Created by neethu on 3/3/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("UserController", UserController);

    function UserController($scope, UserService, $rootScope) {
        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.message = null;
        $scope.users = UserService.getAllUsers();
        $scope.user = null;

        function addUser(user) {
            $scope.message = null;
            errorCheck(user);
            if ($scope.message) {
                return;
            }
            UserService.addUser(user);
            $scope.user = null;
            $rootScope.selectedUserIndex = null;
        }

        function removeUser(user) {
            UserService.removeUser(user);
        }

        function selectUser(index) {
            $scope.user = UserService.selectUser(index);
        }

        function updateUser(user) {
            $scope.message = null;
            errorCheck(user);
            if ($scope.message) {
                return;
            }
            $scope.user = UserService.updateUser(user);
            $scope.user = null;
            $rootScope.selectedUserIndex = null;
        }

        function errorCheck(user) {
            if (user === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.emailid) {
                $scope.message = "Please provide a valid email id";
                return;
            }
            if (!user.password) {
                $scope.message = "Please provide a password";
                return;
            }
            if (!user.firstname) {
                $scope.message = "Please provide a first name";
                return;
            }
            if (!user.lastname) {
                $scope.message = "Please provide a last name";
                return;
            }
            if (!user.role) {
                $scope.message = "Please select a role";
                return;
            }
        }
    }
}());

