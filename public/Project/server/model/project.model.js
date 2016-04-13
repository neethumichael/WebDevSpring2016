/**
 * Created by neethu on 3/17/2016.
 */
var q = require("q");
var mongoose = require("mongoose");
module.exports = function (db, mongoose) {

    var ProjectSchema = require("./project.schema.js")(mongoose);
    var ProjectModel = mongoose.model('ProjectData', ProjectSchema, 'ProjectData');
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findProjectByTitle: findProjectByTitle,
        searchProject: searchProject
    };
    return api;

    function Delete(id) {
        var deferred = q.defer ();
        ProjectModel
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

    function Update(Id, project) {
        var deferred = q.defer();
        var Project ={
            title: project.title,
            commits: project.commits,
            gusername: project.gusername,
            repos: project.repos,
            userId: project.userId,
            description: project.description,
            status: project.status
        };
        ProjectModel
            .update (
                {_id: Id},
                {$set: Project},
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

    function FindAll(userId) {
        var deferred = q.defer ();
        ProjectModel.find ({
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

    function FindById(projectId) {
        return ProjectModel.findById (projectId);
    }

    function Create(userId,project) {
        var newProject = {
            userId: userId,
            title: project.title,
            commits: project.commits,
            gusername: project.gusername,
            repos: project.repos,
            description: project.description,
            status: project.status
        };

        var deferred = q.defer();
        ProjectModel.create(newProject, function (err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findProjectByTitle(title) {
        var deferred = q.defer ();
        ProjectModel
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

    function searchProject(searchString) {
        var deferred = q.defer ();
        console.log("seachString "+searchString);
console.log("data.title "+searchString.title);
        console.log("data.status "+searchString.status);
        console.log("data.keywords "+searchString.keywords);
    ProjectModel
        .find(
            {
                $or: [{title: searchString.title},
                    {status: searchString.status},
                    {description: searchString.keywords}]
            },
            function (err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                    console.log("dshjsd " + doc.title);
                } else {
                    console.log("error " + err);
                    deferred.reject(err);
                }
            }
        );
    return deferred.promise;




    }
}
