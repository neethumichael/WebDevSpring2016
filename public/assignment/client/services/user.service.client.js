/**
 * Created by neethu on 2/20/2016.
 */
(function(){
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
            logout: logout
        };
        return model;

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username="+username);
        }
        function findUserByCredentials(credentials) {
            var userName = credentials.username;
            var passWord = credentials.password;
            return $http.get("/api/assignment/user?username="+userName+"&password="+passWord);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId,user);
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }
    }
})();
