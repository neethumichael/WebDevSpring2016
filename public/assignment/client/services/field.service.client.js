/**
 * Created by neethu on 3/18/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var field_model =
        {
            createFieldForForm : createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return field_model;

        function createFieldForForm(formId, field) {
            console.log("client formId "+formId);
            console.log("client field "+field.label);
            return $http.post("/api/assignment/form/"+formId+"/field",field);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId,field);
        }
    }
}());
