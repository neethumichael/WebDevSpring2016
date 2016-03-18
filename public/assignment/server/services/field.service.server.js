/**
 * Created by neethu on 3/17/2016.
 */
module.exports = function(app, formModel, userModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field",updateField);
    app.put("/api/assignment/form/:formId/field/:fieldId",createFieldForForm);

    function createFieldForForm(req,res) {
        var formId = req.params.formId;
        var newField = req.body;
        var field = fieldModel.createFieldForForm(formId,newField);
        return res.json(field);
    }

    function getFieldsForForm(req,res) {
        var formId = req.params.formId;
        var fields = fieldModel.getFieldsForForm(formId);
        return res.json(fields);
    }

    function getFieldForForm(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldModel.getFieldForForm(formId,fieldId);
        return res.json(field);
    }

    function deleteFieldFromForm(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = fieldModel.deleteFieldFromForm(formId,fieldId);
        return res.json(fields);
    }

    function updateField(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedForm = req.body;
        var fields = fieldModel.deleteFieldFromForm(formId,fieldId,updatedForm);
        return res.json(fields);
    }
}