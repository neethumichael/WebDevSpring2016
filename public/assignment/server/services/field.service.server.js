/**
 * Created by neethu on 3/17/2016.
 */
module.exports = function(app, formModel, userModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    app.put("/api/assignment/form/:formId/field/start/:startIndex/end/:newIndex",updateOrder);

    var fieldModel   = require("../models/field.model.js")(formModel);

    function updateOrder(req,res) {
        var formId = req.params.formId;
        var startIndex = req.params.startIndex;
        var newIndex = req.params.newIndex;
        fieldModel.updateOrder(formId,startIndex,newIndex)
            .then(function (doc) {
                res.json(doc.fields);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function createFieldForForm(req,res) {
        var formId = req.params.formId;
        var newField = req.body;
        fieldModel.createFieldForForm(formId,newField)
            .then(function (doc) {
                res.json(doc.fields);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getFieldsForForm(req,res) {
        var formId = req.params.formId;
        fieldModel.getFieldsForForm(formId)
            .then(function (doc) {
                res.json(doc);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getFieldForForm(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.getFieldForForm(formId,fieldId)
            .then(function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function deleteFieldFromForm(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldFromForm(formId,fieldId)
            .then(function (doc) {
                res.json(doc.fields);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateField(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedForm = req.body;
        var fields = fieldModel.updateField(formId,fieldId,updatedForm)
            .then(function (doc) {
                res.json(doc.fields);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }
}
