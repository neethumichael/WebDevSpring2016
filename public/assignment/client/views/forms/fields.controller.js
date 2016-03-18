/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService, $location) {

        var formId = $routeParams.formId;
        var userId = $routeParams.userId;
        var vm = this;
        vm.fields = null;

        function init() {
            FieldService.getFieldsForForm(formId)
                .then(function(response) {
                    var fields = response.data;
                    vm.fields = fields;
                    $location.url("/fields");
                });
        }
        init();

        function addField(fieldType) {
            var field;
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
                    var field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]}
                }

            FieldService.createFieldForForm(formId,field)
                .then (function(response) {
                    vm.fields = response.data;
                    $location.url("/fields");
                });
        }

        function deleteField(field) {
            FieldService.deleteFieldFromForm(formId, fieldId)
                .then(function(response) {
                    vm.fields = response.data;
                    $location.url("/fields");
                });
        }
    }
}());

