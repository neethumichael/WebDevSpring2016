/**
 * Created by neethu on 3/18/2016.
 */
var mock = require("./form.mock.json");
module.exports = function() {
    var api = {
        createFieldForForm: createFieldForForm,
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField
    };
    return api;

    function createFieldForForm(formId,newField) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                newField._id = Guid.create();
                mock[u].fields.push(newField);
                return newField;
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
                        return mock[u];
                    }
                }
            }
        }
        return null;
    }

    function updateField(formId,fieldId,updatedField) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                for(var n in mock[u].fields) {
                    if(mock[u].fields[n]._id == fieldId) {
                        updatedField._id = mock[u].fields[n]._id;
                        mock[u].fields[n] =updatedField;
                        return mock[u];
                    }
                }
            }
        }
        return null;
    }
}