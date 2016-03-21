/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService, FieldService) {

        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.clickForm = clickForm;
        vm.findAllForms = findAllForms;
        vm.selectedForm = null;
        vm.clickedForm = null;
        vm.message = null;
        vm.templateUrl1 = null;

        function init() {
            vm.currentForms = findAllForms();
        }
        init();

        function clickForm(index) {
            vm.templateUrl = "/form/"+vm.currentForms[index]._id+"/fields";
            vm.clickedForm =
            {_id: vm.currentForms[index]._id,
                title: vm.currentForms[index].title,
                userId: vm.currentForms[index].userId
            };
            return vm.templateUrl;
        }

        function addForm(form) {
            if(form===null) {
                vm.message = "Enter a valid form name";
            }
            else {
                    UserService.getCurrentUser()
                        .then (function(response) {
                            FormService.createFormForUser(response.data._id,form)
                                .then(function(response) {
                                    vm.selectedForm = null;
                                    vm.currentForms = findAllForms();
                                });
                            });
            }
        }

        function deleteForm(index) {
            vm.selectedForm = vm.currentForms[index];
            FormService.deleteFormById(vm.selectedForm._id)
                .then(function(response) {
                    vm.currentForms = findAllForms();
                    vm.selectedForm = null;
            });
        }

        function selectForm(index) {
            vm.track = 1;
            vm.selectedForm =
                {_id: vm.currentForms[index]._id,
                    title: vm.currentForms[index].title,
                    userId: vm.currentForms[index].userId
                };
            vm.templateUrl1 = "/form/"+vm.selectedForm._Id+"/fields";
        }

        function updateForm(newform) {
            vm.track = 0;
            if(vm.selectedForm) {
            if(newform) {
                FormService.updateFormById(vm.selectedForm._id,newform)
                    .then(function(response){
                        vm.selectedForm = null;
                        vm.currentForms = findAllForms();
                });
            }
            else {
                vm.message = "Select a form to update";
                vm.selectedForm = null;
            }
            }
        }

        function findAllForms() {
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