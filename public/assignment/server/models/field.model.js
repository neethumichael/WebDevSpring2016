/**
 * Created by neethu on 3/18/2016.
 */
var uuid = require('node-uuid');
var mock = require("./form.mock.json");
module.exports = function() {
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
        for (var u in mock) {
            if (mock[u]._id == formId) {
                var x = mock[u].fields[startIndex];
                mock[u].fields[startIndex] = mock[u].fields[endIndex];
                mock[u].fields[endIndex] = x;
                return mock[u].fields;
            }
        }
            return null;
    }

    function createFieldForForm(formId,newField) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                var uuid1 = uuid.v1();
                newField._id = uuid1;
                mock[u].fields.push(newField);
                return mock[u].fields;
            }
        }
        return null;
    }

    function getFieldsForForm(formId) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                return mock[u].fields;
            }
        }
        return null;
    }

    function getFieldForForm(formId,fieldId) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                for(var n in mock[u].fields) {
                    if(mock[u].fields[n]._id == fieldId)
                    return mock[u].fields[n];
                }
            }
        }
        return null;
    }

    function deleteFieldFromForm(formId,fieldId) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                for(var n in mock[u].fields) {
                    if(mock[u].fields[n]._id == fieldId) {
                        mock[u].fields.splice(n, 1);
                        return mock[u].fields;
                    }
                }
            }
        }
        return null;
    }

    function updateField(formId,fieldId,updatedField) {
        console.log("updatedField label "+updatedField.type);
        for (var u in mock) {
            if (mock[u]._id == formId) {
                console.log("form found");
                for(var n in mock[u].fields) {
                    console.log("FDs "+mock[u].fields[n]._id);
                    if(mock[u].fields[n]._id == fieldId) {
                        console.log("field found");

                        mock[u].fields[n].label = updatedField.label;
                        if(updatedField.type == "TEXT" || updatedField.type == "TEXTAREA") {
                            updatedField._id = mock[u].fields[n]._id;

                            mock[u].fields[n].placeholder = updatedField.placeholder;
                            return mock[u].fields;
                        }
                        else if (updatedField.type == "DATE") {
                            updatedField._id = mock[u].fields[n]._id;
                            return mock[u].fields;

                        }
                        else if(updatedField.type == "OPTIONS" || updatedField.type == "CHECKBOXES" || updatedField.type == "RADIOS" ) {

                            console.log("here");
                                var  temp1 = updatedField.options.split("\n");
                             for(var v in temp1) {
                                 var temp = temp1[v].split(":");
                                 if (mock[u].fields[n].options[v]) {
                                     updatedField._id = mock[u].fields[n]._id;
                                 mock[u].fields[n].options[v].label = temp[0];
                                 mock[u].fields[n].options[v].value = temp[1];
                             }
                                 else {
                                     mock[u].fields[n].options.push({
                                         label: temp[0],
                                         value: temp[1]
                                     });
                                     }
                                 }
                            console.log("after pushing "+mock[u].fields[n].options.length);
                            return mock[u].fields;
                             }
                        }
                    }
                }
            }
        return null;
        }
    }
