/**
 * Created by neethu on 2/20/2016.
 */
(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService, $location) {

        var vm = this;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.findAllUsers = findAllUsers;
        vm.sortTable = sortTable;
        vm.user = null;
        vm.message = null;

        function init() {
            vm.users = findAllUsers();
        }
        init();

        function sortTable(f,n){
            console.log("invoked");
            var rows = $('#mytable tbody  tr').get();

            rows.sort(function(a, b) {

                var A = getVal(a);
                var B = getVal(b);

                if(A < B) {
                    return -1*f;
                }
                if(A > B) {
                    return 1*f;
                }
                return 0;
            });

            function getVal(elm){
                var v = $(elm).children('td').eq(n).text().toUpperCase();
                if($.isNumeric(v)){
                    v = parseInt(v,10);
                }
                return v;
            }

            $.each(rows, function(index, row) {
                $('#mytable').children('tbody').append(row);
            });
        }
        var f_sl = 1; // flag to toggle the sorting order
        var f_nm = 1; // flag to toggle the sorting order
        $("#sl").click(function(){
            f_sl *= -1; // toggle the sorting order
            var n = $(this).prevAll().length;
            sortTable(f_sl,n);
        });
        $("#nm").click(function(){
            f_nm *= -1; // toggle the sorting order
            var n = $(this).prevAll().length;
            sortTable(f_nm,n);
        });

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


            UserService.findUserByUsername(user.username).then(
                function(response) {
                    if (response.data!= null || (typeof response.data) == "undefined") {
                        vm.message = "User already exists";
                        return;
                    }
                    else {
                        UserService.createUser(user)
                            .then(function(response){
                                vm.users = findAllUsers();
                                vm.user = null;
                            }),
                            function (error) {
                                vm.message = error;
                            };
                    }
                }),
                function (error) {
                    vm.message = error;
                };

        }

        function deleteUser(index) {
            vm.user = vm.users[index];
            UserService.deleteUserByIdAdmin(vm.user._id)
                .then(function(response) {
                    vm.users = findAllUsers();
                    vm.user = null;
                });
            vm.user = null;
        }

        function selectUser(index) {
            vm.track = 1;
            vm.user = {
                _id: vm.users[index]._id,
                username: vm.users[index].username,
                firstName: vm.users[index].firstName,
                lastName: vm.users[index].lastName,
                roles: vm.users[index].roles,
                password: vm.users[index].password
            };
        }

        function updateUser(newUser) {
            vm.track = 0;
            if(vm.user) {
                if(newUser) {
                    UserService.updateUserByAdmin(vm.user._id,newUser)
                        .then(function(response) {
                            vm.user = null;
                            vm.users = findAllUsers();
                        });
                }
                else {
                    vm.message = "Select a user to update";
                    vm.user = null;
                }
            }
            vm.user = null;
        }

        function findAllUsers() {
            var cur_user =null;
            var user;
                    UserService.findAllUsersAdmin()
                        .then(function(response) {
                            vm.users = response.data;
                        });

            return vm.users;
        }
    }
})();
