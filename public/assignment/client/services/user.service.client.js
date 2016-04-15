/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        $rootScope.currentUser = null;

        var model = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            updateUser: updateUser,
            findUserByCredentials: findUserByCredentials,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            logout: logout,
            createUserByAdmin: createUserByAdmin,
            findAllUsersAdmin: findAllUsersAdmin,
            findByIdAdmin: findByIdAdmin,
            deleteUserByIdAdmin : deleteUserByIdAdmin,
            updateUserByAdmin: updateUserByAdmin
        };
        return model;

        function createUserByAdmin(user) {
            return $http.post("/api/assignment/admin/user" , user);
        }

        function findAllUsersAdmin() {
            return $http.get("/api/assignment/admin/user");
        }

        function findByIdAdmin(userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function deleteUserByIdAdmin(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUserByAdmin(userId,user) {
            return $http.put("/api/assignment/admin/user/" + userId,user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }
        function findUserByCredentials(credentials) {
            var userName = credentials.username;
            var passWord = credentials.password;
            return $http.get("/api/assignment/login?username=" + userName + "&password=" + passWord);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            console.log("inside service "+user.username);
            return $http.post("/api/assignment/register" , user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function logout() {
            console.log("calling server logout");
            return $http.post("/api/assignment/logout");
        }
    }
})();
