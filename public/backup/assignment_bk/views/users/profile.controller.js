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
        var temp_user = UserService.getCurrentUser();
        $scope.currentUser = {
            firstName: temp_user.firstName,
            lastName: temp_user.lastName,
            username: temp_user.username,
            password: temp_user.password,
            roles: temp_user.roles,
            password2: temp_user.password2,
            email: temp_user.email
        };
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            $scope.error = null;
            $scope.message = null;
            if(typeof user === "undefined") {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (user === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide an email id";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password !== user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.firstName) {
                $scope.message = "Please provide a first name";
                return;
            }
            if (!user.lastName) {
                $scope.message = "Please provide a last name";
                return;
            }

            UserService.updateUser(user.username, user,
            function(user) {
                if (user) {
                    $scope.message = "User updated successfully";
                    UserService.setCurrentUser(user);
                } else {
                    $scope.message = "Unable to update the user";
                }
                $location.url('/profile/');
            });
        }
    }
}());

