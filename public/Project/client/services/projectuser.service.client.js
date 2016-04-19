/**
 * Created by neethu on 2/20/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .factory("ProjectUserService", ProjectUserService);

    function ProjectUserService($rootScope, $http) {

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
            updateUserByAdmin: updateUserByAdmin,
            addMessage: addMessage,
            findAllMessage: findAllMessage,
            deleteContact: deleteContact
        };
        return model;

        function deleteContact(messageId) {
            return $http.delete("/api/projecttracker/contact/"+messageId);
        }
        function addMessage(message) {
            return $http.put("/api/projecttracker/contact",message);
        }
        function findAllMessage() {
            return $http.get("/api/projecttracker/contact");
        }

        function createUserByAdmin(user) {


            return $http.post("/api/projecttracker/admin/user" , user);
        }

        function findAllUsersAdmin() {
            console.log("inside create user for project");
            return $http.get("/api/projecttracker/admin/user");
        }

        function findByIdAdmin(userId) {
            return $http.get("/api/projecttracker/admin/user/" + userId);
        }

        function deleteUserByIdAdmin(userId) {
            return $http.delete("/api/projecttracker/admin/user/" + userId);
        }

        function updateUserByAdmin(userId,user) {
            return $http.put("/api/projecttracker/admin/user/" + userId,user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/projecttracker/user?username="+username);
        }
        function findUserByCredentials(credentials) {
            var userName = credentials.username;
            var passWord = credentials.password;
            return $http.get("/api/projecttracker/user?username="+userName+"&password="+passWord);
        }

        function findAllUsers() {
            return $http.get("/api/projecttracker/user");
        }

        function createUser(user) {
            return $http.post("/api/projecttracker/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/projecttracker/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/projecttracker/user/"+userId,user);
        }

        function getCurrentUser() {
            return $http.get("/api/projecttracker/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function logout() {
            return $http.post("/api/projecttracker/logout");
        }
    }
})();
