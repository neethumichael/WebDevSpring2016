/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $routeParams, FormService,$rootScope,UserService) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.findAll = findAll;
        $scope.selectedForm = null;
        $scope.currentForms = findAll();
        $scope.message = null;

        function addForm(form) {
            if(form===null) {
                    $scope.message = "Enter a valid form name";
            }
            else {
                if(!$scope.selectedForm) {
                    FormService.createFormForUser(
                        UserService.getCurrentUser()._id,
                        form,
                        function (form) {
                            $scope.selectedForm = null;
                            $scope.currentForms = findAll();
                            $location.url("/forms");
                        });
                }
            }
        }

        function deleteForm(index) {

            $scope.selectedForm =
                $scope.currentForms[index];
            FormService.deleteFormById($scope.selectedForm._id,function(form) {
                    $scope.currentForms = findAll();
                    $scope.selectedForm = null;
                    $location.url("/forms");
            })
        }

        function selectForm(index) {

            $scope.selectedForm =
                {_id: $scope.currentForms[index]._id,
                    title: $scope.currentForms[index].title,
                    userId: $scope.currentForms[index].userId
        };
        }

        function updateForm(newform) {
            if($scope.selectedForm)
            {
            if(newform)
            {
                FormService.updateFormById($scope.selectedForm._id,newform,function(form){
                        $scope.selectedForm = null;
                        $scope.currentForms = findAll();
                        $location.url("/forms");
                });
            }
            else {
                $scope.message = "Select a form to update";
            }
            }
        }
        function findAll() {
            var cur_form =null;
            FormService.findAllFormsForUser(
                UserService.getCurrentUser()._id,
                function(currentForms){
                    cur_form =  currentForms;
                });
            return cur_form;
        }
    }
}());