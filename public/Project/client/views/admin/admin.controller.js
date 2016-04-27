/**
 * Created by neethu on 2/20/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("AdminController",AdminController);

    function AdminController(ProjectUserService, $location, $scope) {

        var vm = this;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.findAllUsers = findAllUsers;
        vm.user = null;
        vm.message = null;
        $scope.sortType     = 'model.user.username';
        $scope.sortReverse  = true;

        function init() {
            vm.users = findAllUsers();
            for(var i in vm.users) {
                vm.users[i].roles = vm.users[i].roles.toString();
            }
        }
        init();

        function addUser(user) {
            vm.message = null;
            if(typeof user === "undefined") {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (user === null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }


            ProjectUserService.findUserByUsername(user.username).then(
                function(response) {
                    if (response.data!= null || (typeof response.data) == "undefined") {
                        vm.message = "User already exists";
                        return;
                    }
                    else {
                        ProjectUserService.createUserByAdmin(user)
                            .then(function(response){


                                vm.user = null;
                            }),
                            function (error) {
                                vm.message = error;
                            };
                        vm.users = findAllUsers();
                        vm.user = null;
                    }
                }),
                function (error) {
                    vm.message = error;
                };

        }

        function deleteUser(user) {

            ProjectUserService.deleteUserByIdAdmin(user._id)
                .then(function(response) {
                    vm.users = findAllUsers();
                    for(var i in vm.users) {
                        vm.users[i].roles = vm.users[i].roles.toString();
                    }
                    vm.users = findAllUsers();
                    vm.user = null;
                });
            vm.user = null;
        }

        function selectUser(user) {
            vm.track = 1;
           for(var index in vm.users) {
               if(vm.users[index]._id == user._id) {
                   vm.user = {
                       _id: vm.users[index]._id,
                       username: vm.users[index].username,
                       firstName: vm.users[index].firstName,
                       lastName: vm.users[index].lastName,
                       roles: vm.users[index].roles,
                       password: vm.users[index].password
                   };
                   break;
               }
           }

        }

        function updateUser(newUser) {
            vm.track = 0;
            if(vm.user) {
                if(newUser) {
                    ProjectUserService.updateUserByAdmin(vm.user._id,newUser)
                        .then(function(response) {
                            vm.user = null;
                            vm.users = findAllUsers();
                            for(var i in vm.users) {
                                vm.users[i].roles = vm.users[i].roles.toString();
                            }
                            vm.users = findAllUsers();
                        });
                }
                else {
                    vm.message = "Select a user to update";
                    vm.user = null;
                }
            }
            vm.user = null;
            vm.users = findAllUsers();
        }

        function findAllUsers() {
            var cur_user =null;
            var user;
            ProjectUserService.findAllUsersAdmin()
                        .then(function(response) {
                            vm.users = response.data;
                            for(var i in vm.users) {
                                vm.users[i].roles = vm.users[i].roles.toString();
                            }
                        });

            return vm.users;
        }
    }
})();
