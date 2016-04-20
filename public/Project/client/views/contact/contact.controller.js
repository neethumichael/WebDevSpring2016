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
        vm.viewAllMessage = viewAllMessage;
        vm.deleteContact = deleteContact;

        vm.sortType     = 'model.contacts.emailId';
        vm.sortReverse  = true;
        function init() {
                   //if($location.url == '/adminContact') {
                       //console.log("location correct");
                      viewAllMessage();
                   //}
        }
        init();

        function deleteContact(message) {
            console.log("called delete");
                ProjectUserService.deleteContact(message._id)
                    .then(function(response) {
                        console.log("deleet cont");
                        vm.contacts = viewAllMessage();
                    });
        }

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
            ProjectUserService
                .findAllMessage()
                .then(function(response){
                    vm.contacts = response.data;
                });
            return vm.contacts;

        }
    }
}());

