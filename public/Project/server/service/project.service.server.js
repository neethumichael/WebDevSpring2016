
module.exports = function(app, projectModel, accessModel) {


    app.post("/api/projecttracker/project/:userId", create);
    app.get("/api/projecttracker/project", findAllProjectsForUser);
    app.put("/api/projecttracker/project", Update);
    app.delete("/api/projecttracker/project/:id", Delete);
    app.get("/api/assignment/project/:userId/user", findAllProjectsForUser);
    //app.get("/api/projecttracker/project/search/:title/:status/:keywords/user/:userId/:roles/:email",searchProject);
    app.put("/api/projecttracker/project/editAccess/:projectId/:email",updateProjectAccess);
    app.put("/api/projecttracker/project/Access/",updateAccess);
    app.delete("/api/projecttracker/project/Access/:accessId",deleteAccess);
    app.post("/api/projecttracker/project/Access/:projectId",addAccess);
    app.get("/api/projecttracker/project/Access/:projectId",findAllAccess);
    app.post("/api/projecttracker/project/search/:userId/:roles/:email",searchProject);



    function updateAccess(req,res) {
        var access = req.body;

                    accessModel.Update(access)
                        .then(
                            function (project) {
                                res.json(project);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                }

    function deleteAccess(req,res) {
        var id = req.params.accessId;
        accessModel.Delete(id)
            .then(
                function (accesses) {
                    res.json(accesses);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function addAccess(req,res) {
        var access = req.body;
        var projectId = req.params.projectId;

        accessModel.Create(access, projectId)
            .then(
                function (project) {
                    res.json(project);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllAccess(req,res) {
        var projectId = req.params.projectId;
        accessModel.FindByProjectId(projectId)
            .then(
                function (access) {
                    res.json(access);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateProjectAccess(req, res) {
        var projectAccess = req.params.email;

        var projectId = req.params.projectId;

        projectModel.FindById(projectId)
            .then(
                function (projectOld) {
                    var project = projectOld;
                    project.accessEmail = projectAccess;
                    projectModel.Update(projectOld._id,project)
                        .then(
                            function (project) {
                                res.json(project);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                });
    }


    function searchProject(req, res) {
        var searchString = req.body;
        var userId = req.params.userId;
        var roles = req.params.roles;
        var email = req.params.email;


        projectModel.searchProject(searchString, userId, roles, email)
            .then(
                function (projects) {


                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function Delete(req, res) {
        var id = req.params.id;

        projectModel.Delete(id)
            .then(
                function (projects) {
                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function Update(req, res) {
        var project = req.body;
        console.log("here");

                    projectModel.Update(project._id,project)
                        .then(
                            function (project) {
                                res.json(project);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );

    }

    function findAllProjectsForUser(req, res) {
        var userId = req.params.userId;
        projectModel.FindAll(userId)
            .then(
                function (projects) {
                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function create(req, res) {
        var userId = req.params.userId;
        var project = req.body;
        projectModel.Create(userId, project)
            .then( function (project) {
                    res.json(project);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

};



