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
                    "password2": "alice", "email": "alice@gmail.com"
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"],
                    "password2": "bob", "email": "bob@yahoo.com"
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"],
                    "password2": "charlie", "email": "charlie_brown@yahoo.com"
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"],
                    "password2": "dan", "email": "dan@yahoo.com"
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"],
                    "password2": "ed", "email": "Edward.Norton@yahoo.com"
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
                roles: null,
                email: user.email
            };
            model.current_users.push(newUser);
            callback(newUser);
        }

        function findAllUsers(callback) {
            callback(model.current_users);
        }

        function deleteUserById(userId, callback) {
            for (var u in model.current_users) {
                if (model.current_users[u]._id === userId) {
                    model.current_users.splice(u, 1);
                }
            }
            callback(model.current_users);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findUserByUsername (userId, callback) {
            for (var u in model.current_users) {
                if (model.current_users[u].username === userId) {
                    callback(model.current_users[u]);
                }
            }
            callback(null);
        }

        function updateUser(userId, currentUser, callback) {
            model.findUserByUsername(userId,
            function(user) {
                if (user != null) {
                    user.firstName = currentUser.firstName;
                    user.lastName = currentUser.lastName;
                    user.password = currentUser.password;
                    user.password2 = currentUser.password2;
                    user.email = currentUser.email;
                    callback(user);
                } else {
                    callback(null);
                }
            });
        }

        function findUserByCredentials(username, password, callback) {

            for (var u in model.current_users) {
                if (model.current_users[u].username === username &&
                    model.current_users[u].password === password) {
                    callback(model.current_users[u]);
                }
            }
            callback(null);
        }
    }
})();
