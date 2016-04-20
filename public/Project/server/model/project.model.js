/**
 * Created by neethu on 3/17/2016.
 */
var q = require("q");
var mongoose = require("mongoose");
module.exports = function (db, mongoose, accessModel, userModel) {
    var AccessModel = accessModel.getMongooseModel();
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
        console.log("ghh "+project.accessEmail);
        var Project ={
            title: project.title,
            commits: project.commits,
            gusername: project.gusername,
            repos: project.repos,
            userId: project.userId,
            description: project.description,
            status: project.status,
            accessEmail: project.accessEmail,
            endDate: project.endDate,
            startDate: project.startDate,
            grade: project.grade,
            gradeTotal: project.gradeTotal,
            gradeComments: project.gradeComments
        };
        ProjectModel
            .update (
                {_id: Id},
                {$set: Project},
                function (err, doc) {
                    if (!err) {
                        console.log("doc "+doc.accessEmail);
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
            gusername: project.gusername,
            repos: project.repos,
            description: project.description,
            status: project.status,
            startDate: project.startDate,
            endDate: project.endDate
        };
console.log("djndsjskd "+userId);
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
                {title: title},
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

    function searchProject(searchString, userId, roles, email) {
        var deferred = q.defer ();
       if(typeof searchString.title == "undefined"){
           searchString.title ="";
       }
        if(typeof searchString.status == "undefined"){
            searchString.status ="";
        }
        if(typeof searchString.keywords == "undefined"){
            searchString.keywords="";
        }
       // for(var u in roles) {
            if(roles == "Admin" || roles == "admin") {
                console.log("Fd"+searchString.title);
                console.log("Fd"+searchString.status);
                console.log("Fd"+searchString.keywords);
                ProjectModel
                    .find(
                        {
                            $or: [{title: searchString.title },
                                {status: searchString.status},
                                {description: searchString.keywords }
                               ]
                        },
                        function (err, doc) {
                            var temp_doc =[];
                            temp_doc = doc;
                            if (!err) {
                               // console.log("doc.userId "+doc.userId);

                                deferred.resolve(doc);
                                //console.log("dshjsd " + doc);
                            } else {
                                console.log("error " + err);
                                deferred.reject(err);
                            }
                        }
                    );
                return deferred.promise;
            }
            else if(roles == "Faculty") {
                accessModel.FindByUserId(email)
                    .then(
                        function (projects) {
                            var id =[];
                            console.log("proejcts "+projects);
                            for(var u in projects) {
                                id[u] = projects[u].projectId;
                                console.log("adding id "+id[u]);
                            }

                            ProjectModel
                                .find(
                                    {
                                        $or: [{title: searchString.title},
                                            {status: searchString.status},
                                            {description: searchString.keywords}],

                                        $and: [ {_id: {$in: id}}]
                                    },
                                    function (err, doc) {
                                        if (!err) {
                                            deferred.resolve(doc);


                                        } else {
                                            console.log("error " + err);
                                            deferred.reject(err);
                                        }
                                    }
                                );

                            res.json(projects);
                        },
                        function (err) {
                            res.status(400).send(err);
                        });

                return deferred.promise;

            }
            else {
                ProjectModel
                    .find(
                        {
                            $or: [{title: searchString.title},
                                {status: searchString.status},
                                {description: searchString.keywords}],

                            $and: [ {userId: userId}]
                        },
                        function (err, doc) {
                            if (!err) {
                               deferred.resolve(doc);

                                //console.log("dshjsd " + doc.title);
                            } else {
                                console.log("error " + err);
                                deferred.reject(err);
                            }
                        }
                    );
                return deferred.promise;
            }
       // }





    }
};
