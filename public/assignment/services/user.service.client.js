/**
 * Created by neethu on 2/20/2016.
 */
(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var current_users = [];
        $rootScope.currentUser = null;

        var model = {
            current_users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"],
                    "password2": "alice"
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"],
                    "password2": "bob"
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"],
                    "password2": "charlie"
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"],
                    "password2": "dan"
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"],
                    "password2": "ed"
                }
            ],

            createUser: createUser,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            updateUser: updateUser,
            findUserByCredentials: findUserByCredentials,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers
        };
        return model;


        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: null,
                lastName: null,
                username: user.username,
                password: user.password,
                password2: user.password2,
                roles: null
            };
            model.current_users.push(newUser);
            return newUser;
        }

        function findAllUsers(callback)
        {
            return model.current_users;
        }

        function deleteUserById(userId, callback) {

            for (var u in model.current_users) {
                if (model.current_users[u]._id === userId) {
                    model.current_users.splice(u, 1);
                }

            }
            return model.current_users;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findUserByUsername (username) {
            for (var u in model.current_users) {
                if (model.current_users[u].username === username) {
                    return model.current_users[u];
                }
            }
            return null;
        }

        function updateUser(currentUser) {
            var user = model.findUserByUsername(currentUser.username);

            if (user != null) {
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                user.password2 = currentUser.password2;
                return user;
            } else {
                return null;
            }
        }

        function findUserByCredentials(credentials) {

            for (var u in model.current_users) {
                if (model.current_users[u].username === credentials.username &&
                    model.current_users[u].password === credentials.password) {
                    return model.current_users[u];
                }
            }
            return null;
        }
    }
})();
