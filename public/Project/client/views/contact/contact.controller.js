/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .controller("ContactController",ContactController);

    function ContactController(ProjectUserService, $location) {
        var vm = this;

        vm.addMessage = addMessage;
        function init() {

        }
        init();

        function addMessage(message) {
            vm.message = null;
            vm.alert = null;
            if(!message) {
                vm.alert = "Please enter both the fields";
                return
            }
            else if(!message.emailId || !message.message) {
                vm.alert = "Please enter both the fields";
                return;
            }
            ProjectUserService
                .addMessage(message)
                .then(function(){
                    vm.message = "Message sent successfully";
                });
        }

        function viewAllMessage() {

        }
    }
}());

