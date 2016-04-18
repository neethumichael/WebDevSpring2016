/**
 * Created by neethu on 4/17/2016.
 */
var q = require("q");
var mongoose = require("mongoose");
module.exports = function (db, mongoose, ProjectModel) {

    var AccessSchema = require("./access.schema.js")(mongoose);
    var AccessModel = mongoose.model('ProjectAccess', AccessSchema, 'ProjectAccess');
    var api = {
        Create: Create,
        Update: Update,
        Delete: Delete,
        FindByProjectId: FindByProjectId,
        FindByUserId: FindByUserId,
        FindById: FindById,
        getMongooseModel: getMongooseModel
    };
    return api;

    function Delete(id) {
        var deferred = q.defer ();
        AccessModel
            .remove (
                {_id: id},
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

    function getMongooseModel() {
        return AccessModel;
    }


    function Update(access) {
        var deferred = q.defer();
         var Id = access._id;
        console.log("id "+Id);
        console.log("userId "+access.userId);
        console.log("projectId "+access.projectId);
        var Access ={
            userId : access.userId,
            projectId: access.projectId
        };
        AccessModel
            .update (
                {_id: Id},
                {$set: Access},
                function (err, doc) {
                    if (!err) {
                        console.log("doc "+doc);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function FindById(projectId) {
        return AccessModel.findById (projectId);
    }
    function FindByProjectId(projectId) {
        var deferred = q.defer ();
        console.log("inside model findproject "+(typeof projectId));
        AccessModel.find (
            {projectId: {$in: projectId}},
            function (err, access) {
                if (!err) {
                    console.log("in model ");
                    deferred.resolve (access);
                } else {
                    deferred.reject (err);
                }
            }

        );
        return deferred.promise;
    }

    function FindByUserId(userId) {
        var deferred = q.defer ();
        AccessModel.find ({
                userId: {$in: userId}
            },
            function (err, access) {
                if (!err) {
                    deferred.resolve (access);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function Create(access,projectId) {

        var newAccess = {
            userId: access.userId,
            projectId: projectId
        };

        var deferred = q.defer();
        AccessModel.create(newAccess, function (err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("jhsdj "+doc.projectId);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }




};

