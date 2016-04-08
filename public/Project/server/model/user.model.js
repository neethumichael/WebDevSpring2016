/**
 * Created by neethu on 3/17/2016.
 */
var q = require("q");
module.exports = function (db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ProjectUser', UserSchema, 'ProjectUser');
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

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
            emails: user.emails,
            phones: user.phones
        };
        UserModel
            .update (
                {username: user.username},
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
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Create(user) {
        var deferred = q.defer();
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

