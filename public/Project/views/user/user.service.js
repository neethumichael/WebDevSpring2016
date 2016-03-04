/**
 * Created by neethu on 3/3/2016.
 */
/**
 * Created by neethu on 2/20/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .factory("UserService", UserService);

    function UserService() {


        var selectedUserIndex =null;
        var selectedUser = null;
        var model = {
            users: [
                {firstname: "Alice", lastname: "Wonderland", username: "alice", password: "alice",
                    emailid: "alice@xyz.com", user_id: 123,
                    role: "Project Manager"},
                {firstname: "John", lastname: "Doe", username: "john_doe", password: "john_doe", emailid: "john_doe@xyz.com", user_id: 234,
                    role: "Team Lead"},
                {firstname: "Max", lastname: "Mathew", username: "max_mathew", password: "max_mathew", emailid: "max_mathew@xyz.com", user_id: 678,
                    role: "Team Member"}
            ],

            updateUser: updateUser,
            selectUser: selectUser,
            removeUser: removeUser,
            addUser: addUser,
            getAllUsers: getAllUsers

        };
        return model;


        function getAllUsers()
        {
            return model.users;
        }

        function updateUser(user)
        {
            model.users[selectedUserIndex] = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                password: user.password,
                emailid: user.emailid,
                role: user.role
            };

        }

        function selectUser(index)
        {
            selectedUserIndex = index;
            selectedUser = {
                firstname: model.users[index].firstname,
                lastname: model.users[index].lastname,
                username: model.users[index].username,
                password: model.users[index].password,
                emailid: model.users[index].emailid,
                role: model.users[index].role
            };
            return selectedUser;
        }

        function removeUser(user)
        {
            var index = model.users.indexOf(user);
            model.users.splice(index, 1);
        }

        function addUser(user)
        {
            var newUser = {
                userid: (new Date).getTime(),
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                password: user.password,
                emailid: user.emailid,
                role: user.role
            };
           model.users.push(newUser);
        }
    }
})();

