/**
 * Created by neethu on 3/17/2016.
 */
var q = require("q");
module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema, 'Form');

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return FormModel;
    }

    function Delete(formId) {
        var deferred = q.defer ();
        FormModel
            .remove (
                {_id: formId},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer ();
        FormModel
            .findOne (
                {title: title.toString()},
                function (err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function FindById(formId) {
        return FormModel.findById (formId);
    }

    function Create(userId,form) {
        var newForm = {
            userId: userId,
            title: form.title
        };

    var deferred = q.defer();
    FormModel.create(newForm, function (err,doc) {
        console.log(doc);
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(doc);
        }

    });
    return deferred.promise;
}

    function FindAll(userId) {
        var deferred = q.defer ();
        FormModel.find ({
                userId: {$in: userId}
            },
            function (err, forms) {
                if (!err) {
                    deferred.resolve (forms);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function Update(formId, newForm) {
        var deferred = q.defer();
        FormModel
            .update (
                {_id: formId},
                {$set: newForm},
                function (err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
}
