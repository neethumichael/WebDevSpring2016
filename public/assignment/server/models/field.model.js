/**
 * Created by neethu on 3/18/2016.
 */
var uuid = require('node-uuid');
var q = require("q");
var mongoose = require("mongoose");
module.exports = function(formModel) {
    var FormModel = formModel.getMongooseModel();

    var api = {
        createFieldForForm: createFieldForForm,
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField,
        updateOrder: updateOrder
    };
    return api;

    function updateOrder(formId, startIndex, endIndex) {
        return formModel
            .FindById(formId)
            .then(
                function(form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

                    // notify mongoose 'pages' field changed
                    form.markModified("fields");

                    form.save();
                }
            );
    }

    function createFieldForForm(formId,newField) {
        return formModel.FindById(formId)
            .then(
                function(form) {
                    form.fields.push(newField);
                    return form.save();
                }
            );
    }

    function getFieldsForForm(formId) {
        return formModel.FindById(formId)
            .then(
                function (doc) {
                    return doc.fields;
                },
                function (err) {
                    return err;
                }
            );

    }

    function getFieldForForm(formId,fieldId) {
        return formModel
            .FindById(formId)
            .then(
                function(form){
                    return form.fields.id(formId);
                }
            );
    }

    function deleteFieldFromForm(formId,fieldId) {
        return formModel
            .FindById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function updateField(formId,fieldId,updatedField) {

        return formModel
            .FindById(formId)
            .then(
                function(form){
                    var field   = form.fields.id(updatedField._id);
                    field.label = updatedField.label;
                    if(updatedField.type == "TEXT" || updatedField.type == "TEXTAREA"
                        || updatedField.type == "EMAIL" || updatedField.type == "PASSWORD") {

                        field.placeholder = updatedField.placeholder;
                        return form.save();
                    }
                    else if (updatedField.type == "DATE") {
                        return form.save();

                    }
                    else if(updatedField.type == "OPTIONS" ||
                        updatedField.type == "CHECKBOXES" ||
                        updatedField.type == "RADIOS" ) {

                        if(updatedField.options) {
                            var temp_option = field.options;
                            field.options=[];

                            var temp1 = updatedField.options.split("\n");

                            for (var v in temp1) {
                                var temp = temp1[v].split(":");


                               /* if (field.options[v]) {
                                    if (temp[0] && temp[1]) {
                                        field.options[v].label = temp[0];
                                        field.options[v].value = temp[1];
                                    }
                                }
                               else */
                               {

                                    if (temp[0] && temp[1]) {
                                        field.options.push({
                                            label: temp[0],
                                            value: temp[1]
                                        });
                                    }
                                   else if (temp[0] || temp[1]) {
                                        field.options.push(temp_option[v]);
                                    }
                                }
                            }
                        }
                     else {
                            return form;
                        }

                        return form.save();
                    }
                }
            );
    }
}
