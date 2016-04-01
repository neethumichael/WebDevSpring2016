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
            updateField: updateField,
            updateOrder: updateOrder
        };
        return field_model;

        function updateOrder(formId,startIndex,newIndex) {
            return $http.put("/api/assignment/form/"+formId+"/field/start/"+startIndex+"/end/"+newIndex);
        }
        function createFieldForForm(formId, field) {
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
