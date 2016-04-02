/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {

        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;
        var temp_user = UserService.getCurrentUser();
        vm.currentUser = {
            firstName: temp_user.firstName,
            lastName: temp_user.lastName,
            username: temp_user.username,
            password: temp_user.password,
            roles: temp_user.roles,
            password2: temp_user.password2,
            email: temp_user.email
        };
        if (!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            vm.error = null;
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
            if (!user.emails) {
               vm.message = "Please provide an email id";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password !== user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            if (!user.firstName) {
                vm.message = "Please provide a first name";
                return;
            }
            if (!user.lastName) {
                vm.message = "Please provide a last name";
                return;
            }

            UserService.updateUser(user.username, user)
                .then(
            function(response) {
                if (response.data) {
                    vm.message = "User updated successfully"
                    var user = response.data;
                  //  var emails = user.emails;
                    //var phones = user.phones;
                  //  user.phones = "";
                  /*  for(var u in emails) {
                        user.emails += emails[u]+",";
                    }
                    user.emails = user.emails.substring(0,user.emails.length-1);
                    for(var u in phones) {
                        user.phones += phones[u]+",";
                    }
                    user.phones = user.phones.substring(0,user.phones.length-1);*/
                    UserService.setCurrentUser(user);
                } else {
                    vm.message = "Unable to update the user";
                }
                $location.url('/profile/');
            });
        }
    }
}());

