/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $routeParams, FormService,$rootScope,UserService) {

        var vm = this;

        function init() {

        }
        init();
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.clickForm = clickForm;
        vm.findAll = findAll;
        vm.selectedForm = null;
        vm.clickedForm = null;
        vm.currentForms = findAll();
        vm.message = null;
        vm.track = 0;
        vm.templateUrl1 = null;


        function clickForm(index) {
            vm.clickedForm =
            {_id: vm.currentForms[index]._id,
                title: vm.currentForms[index].title,
                userId: vm.currentForms[index].userId
            };
            vm.templateUrl1 = "/form/"+vm.currentForms[index]._id+"/fields";
            console.log("SDFS "+vm.templateUrl1);
            return vm.templateUrl1;
        }

            function addForm(form) {
            if(form===null) {
                    vm.message = "Enter a valid form name";
            }
            else {
                if(vm.track !== 1) {
                    UserService.getCurrentUser()
                        .then (
                            function(response)
                            {
                                FormService.createFormForUser(
                                    response.data._id,form)
                                    .then(
                                        function(response) {
                                            vm.selectedForm = null;
                                            vm.currentForms = findAll();
                                            $location.url("/forms");
                                        }
                                    );
                            }
                        );
                }
            }
        }

        function deleteForm(index) {

            vm.selectedForm =
                vm.currentForms[index];
            FormService.deleteFormById(vm.selectedForm._id)
                .then(function(response) {
                    vm.currentForms = findAll();
                    vm.selectedForm = null;
                    $location.url("/forms");
            })
        }

        function selectForm(index) {

            vm.track = 1;
            vm.selectedForm =
                {_id: vm.currentForms[index]._id,
                    title: vm.currentForms[index].title,
                    userId: vm.currentForms[index].userId
        };
            vm.templateUrl1 = "/form/"+vm.selectedForm._Id+"/fields";
            console.log("SDFS "+vm.templateUrl1);
        }

        function updateForm(newform) {
            vm.track = 0;
            if(vm.selectedForm)
            {
            if(newform)
            {
                FormService.updateFormById(vm.selectedForm._id,newform)
                    .then(function(response){
                        vm.selectedForm = null;
                        vm.currentForms = findAll();
                        $location.url("/forms");
                });
            }
            else {
                vm.message = "Select a form to update";
                vm.selectedForm = null;
            }
            }
        }
        function findAll() {
            var cur_form =null;
            var user;
             UserService.getCurrentUser()
                 .then ( function(response) {
                     user = response.data;
                     FormService.findAllFormsForUser(
                         user._id)
                         .then(
                             function(response){
                                 vm.currentForms =response.data;
                             });
                 });
            return vm.currentForms;
        }
    }
}());