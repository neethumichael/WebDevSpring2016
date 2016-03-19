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
        updateField: updateField
    };
    return api;

    function createFieldForForm(formId,newField) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                var uuid1 = uuid.v1();
                newField._id = uuid1;
                mock[u].fields.push(newField);
                console.log("inside model "+mock[u].fields.size);
                return mock[u].fields;
            }
        }
        return null;
    }

    function getFieldsForForm(formId) {
        for (var u in mock) {
            if (mock[u]._id == formId) {
                console.log("equal");
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