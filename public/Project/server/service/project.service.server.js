module.exports = function(app, projectModel) {

    app.post("/api/projecttracker/project/:userId", create);
    app.get("/api/projecttracker/project", findAllProjectsForUser);
    app.put("/api/projecttracker/project", Update);
    app.delete("/api/projecttracker/project/:id", Delete);
    app.get("/api/assignment/project/:userId/user", findAllProjectsForUser);
   // app.get("/api/projecttracker/project/search",searchProject);
    app.get("/api/projecttracker/project/search/:title/:status/:keywords/user/:userId/:roles/:email",searchProject);
    app.put("/api/projecttracker/project/editAccess/:projectId/:email",updateProjectAccess);


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
        var title = req.params.title;
        var status = req.params.status;
        var keywords = req.params.keywords;
        var userId = req.params.userId;
        var roles = req.params.roles;
        var email = req.params.email;

        var searchString =  {
            title: title,
            status: status,
            keywords: keywords
        }

        projectModel.searchProject(searchString, userId, roles, email)
            .then(
                function (projects) {
                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
        projectModel.findProjectByTitle(project.title)
            .then(
                function (projectOld) {
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
            .then(
                function (project) {
                    res.json(project);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};



