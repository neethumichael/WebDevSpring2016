/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var form_model =
                {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234}
            ],

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById

        };
        return form_model;

        function createFormForUser(userId, form, callback)
        {
            var newForm = {
                _id: (new Date).getTime(),
                userId: userId,
                title: form.title
            };
            form_model.forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback)
         {
            var listOfForms = [];
            var f;
            for (f in form_model.forms)
            {
                if (form_model.forms[f].userId === userId)
                {
                    listOfForms.push(form_model.forms[f]);
                }
            }
            callback(listOfForms);
         }

        function deleteFormById(formId, callback)
         {
            var f;
            for (f in form_model.forms)
            {
                if (form_model.forms[f]._id === formId)
                {
                    form_model.forms.splice(f, 1);
                }
            }
            callback(form_model.forms);
         }

        function updateFormById(formId, newForm, callback)
        {
            var f;
            for (f in form_model.forms)
            {
                if (form_model.forms[f]._id === formId)
                {
                    form_model.forms[f].title = newForm.title;
                    form_model.forms[f].userId = newForm.userId;
                    callback(form_model.forms[f]);
                }
            }
            callback(null);
        }

    }
}());
