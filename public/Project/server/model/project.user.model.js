/**
 * Created by neethu on 3/17/2016.
 */
var q = require("q");
var bcrypt = require("bcrypt-nodejs");
module.exports = function (db, mongoose) {

    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ProjectUser', ProjectUserSchema, 'ProjectUser');
    var ContactSchema = require("./contact.schema.server.js")(mongoose);
    var ContactModel = mongoose.model('ProjectContact', ContactSchema, 'ProjectContact');
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        addMessage: addMessage,
        viewAllMessage: viewAllMessage,
        deleteContact: deleteContact
    };
    return api;

    function deleteContact(messageId) {
        var deferred = q.defer ();
        ContactModel
            .remove (
                {_id: messageId},
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
    function addMessage(message) {
        var deferred = q.defer();
        message.date = Date.now();
        ContactModel.create(message, function (err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function viewAllMessage() {
        var deferred = q.defer ();
        ContactModel.find (
            function (err, messages) {
                if (!err) {
                    //console.log("messages "+messages);
                    deferred.resolve (messages);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }


    function Delete(userId) {
        var deferred = q.defer ();
        UserModel
            .remove (
                {_id: userId},
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

    function findUserByUsername(userName) {
        var deferred = q.defer ();
        UserModel
            .findOne (
                {username: userName.toString()},
                function (err, doc) {
                    if (!err) {
                        console.log(typeof doc);
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer ();
        UserModel.find (
            function (err, users) {
                if (!err) {
                    deferred.resolve (users);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function Update(user) {
        var deferred = q.defer();
        var newUser ={
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles
        };
        UserModel
            .update (
                {_id: user._id},
                {$set: newUser},
                function (err, doc) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function FindById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err,doc) {
            if (err) {
                console.log("errorv"+err);
                deferred.reject(err);
            } else {
                console.log("doc "+doc.username);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Create(user) {
        var deferred = q.defer();
        user.password = bcrypt.hashSync(user.password);
        UserModel.create(user, function (err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(credentials, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}

