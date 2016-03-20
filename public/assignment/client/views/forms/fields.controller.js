/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, $location, $route, $routeParams, $uibModal, $log, $rootScope) {

        var formId = null;
        var userId = $routeParams.userId;

        var vm = this;
        vm.fields = null;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.syncOrder = syncOrder;
        $(function() {
            $( "#sortable" ).sortable({
                axis: y
            });
            stop: $(function (e, ui) {
                console.log("her");
                syncOrder($('#sortable').sortable('toArray'));

            })
        });
        function init() {
            formId = $routeParams.formId;
            FieldService.getFieldsForForm(formId)
                .then(function(response) {
                    var fields = response.data;
                    vm.fields = fields;
                });
        }
        init();

        function syncOrder(elementPositions) {
            for(var u in elementPositions) {
            }
        }

        vm.modalUpdate = function (selectedField) {
            //vm.selectedField = selectedField;

            var textUrl = null;
            if(selectedField.type == "TEXT" || selectedField.type == "TEXTAREA") {
                textUrl = 'views/forms/editModal/singleLine.edit.view.html';
            }
            else if(selectedField.type == "DATE") {
                textUrl = 'views/forms/editModal/date.email.edit.view.html';
            }
            else if(selectedField.type == "OPTIONS" || selectedField.type == "CHECKBOXES" || selectedField.type == "RADIOS" ) {
                textUrl = 'views/forms/editModal/options.edit.view.html';
            }
            else {
                console.log("invalid option");
                return;
            }

            var updateField = $uibModal.open({

                templateUrl: textUrl,
                controller: function($uibModalInstance, field, $scope) {
                   if(selectedField.type == "TEXT" || selectedField.type == "TEXTAREA") {
                        $scope.field = {
                            _id: field._id,
                            label: field.label,
                            type: field.type,
                            placeholder: field.placeholder
                        };
                    }
                    else if (selectedField.type == "DATE") {
                        $scope.field = {
                            _id: field._id,
                            label: field.label,
                            type: field.type
                        };
                    }
                    else if(selectedField.type == "OPTIONS" || selectedField.type == "CHECKBOXES" || selectedField.type == "RADIOS" ) {
                        $scope.field = {
                            _id: field._id,
                            label: field.label,
                            type: field.type,
                            options: field.options
                        };
                        for(var u in field.options) {
                            $scope.field.options[u] = field.options[u].label+":"+field.options[u].value;
                        }
                    }
                    else {
                        console.log("invalid option");
                        return;
                    }

                    $scope.ok = function () {

                     // $scope.field = selectedField;

                        $uibModalInstance.close(field);

                    };

                    $scope.cancel = function () {
                        $scope.field = field;
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.updateField = function(newField) {
                        vm.track = 0;

                        if(newField)
                        {
                            FieldService.updateField(formId,newField._id,newField)
                                .then(function(response){
                                    vm.fields = response.data;
                                    $scope.field = response.data;
                                    vm.selectedField = null;
                                    //$location.path()
                                });
                        }
                        else {
                            vm.message = "Select a field to update";
                            vm.selectedField = null;
                        }
                    }
                },
                resolve: {
                    field: function () {
                        return selectedField;
                    }
                }
            });

            updateField.result.then(function (selectedField) {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        function addField(fieldType) {
            var field;
            formId = $routeParams.formId;
            console.log("step1");
            if(fieldType == "Single Line Text Field" ) {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }

                else if (fieldType == "Multi Line Text Field" ) {
                    field =  {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
                }
                else if (fieldType == "Date Field" ) {
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                }
                else if (fieldType == "Dropdown Field" ) {
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                }
                else if (fieldType == "Checkboxes Field") {
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                }
                else {
                var field = {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }

console.log("step 2");
            FieldService.createFieldForForm(formId,field)
                .then (function(response) {
                    console.log("done creating");
                    vm.fields = response.data;
                    console.log("total size "+response.data.length);
                    //$location.url("/fields");
                });
        }

        function removeField(field) {
            formId = $routeParams.formId;
            var fieldId = field._id;
            console.log("test delete "+formId);
            console.log("test delete fieldId "+fieldId);
            FieldService.deleteFieldFromForm(formId, fieldId)
                .then(function(response) {
                    vm.fields = response.data;
                   // $location.url("/fields");
                });
        }

            }
}());

